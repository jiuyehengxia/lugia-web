/**
 *
 * create by ligx
 *
 * @flow
 */


const EmptyError = '结点不能为空',
  PathEqlKey = 'path不能等于key',
  PidEqlKey = 'pid不能等于key',
  PathNotContainerPid = 'path必须包含pid',
  PidPathMustSameExist = 'pid&path必须同时存在';

const ErrorDefine = {
  EmptyError,
  PathEqlKey,
  PidEqlKey,
  PidPathMustSameExist,
  PathNotContainerPid,
};
type RowData = {
  key: string,
  title: string,
  pid?: string,
  children?: Array<RowData>,
  path?: string,
  isLeaf?: boolean,
};

type ExpandInfo = {
  expandedAll: boolean,
  target: Object,
}

const notEmpty = (obj: any) => {
  return obj !== null && obj !== undefined && obj !== '';
};

class TreeUtils {

  checkTree (datas: Array<Object>): Array<string> {
    let result = [];
    datas.forEach(data => {
      const reseult = this.isRightTreeRowData(data);
      if (reseult !== '') {
        result.push(`${JSON.stringify(data)}==>${reseult}`);
      }
    });
    result = result.concat(this.isRightLevel(datas));
    return result;
  }

  Error: Object;

  constructor () {
    this.Error = ErrorDefine;
    return this;
  }

  isRightTreeRowData (data: Object): string {

    const { key, title, pid, path, } = data;

    const required = notEmpty(key) && notEmpty(title);
    const existPid = notEmpty(pid);
    const existPath = notEmpty(path);

    const notKey = (v: any) => v != key;

    const notExistPathAndPid = !existPid && !existPath;
    const pidAndPathMustSameExists = notExistPathAndPid || (existPid && existPath);

    const pidNotEqlKey = !pidAndPathMustSameExists || notKey(pid);

    const pathNotEqlKey = !pidAndPathMustSameExists || notKey(path);

    const existPathOrExistPidIsHas = !existPath || !existPid;
    const pathNotEndwithsPid = existPathOrExistPidIsHas || path.endsWith(pid);

    if (!required) {
      return EmptyError;
    }
    if (!pidAndPathMustSameExists) {
      return PidPathMustSameExist;
    }
    if (!pidNotEqlKey) {
      return PidEqlKey;
    }
    if (!pathNotEqlKey) {
      return PathEqlKey;
    }
    if (!pathNotEndwithsPid) {
      return PathNotContainerPid;
    }
    return '';
  }

  isRightLevel (datas: Array<Object>): Array<string> {
    const result = [];
    const pidIsNotExist = pid => `找不到key:${pid}的结点.`;
    const levelIsError = ({ key, pid, }) => `${key}结点的层级位置错误，必须处于父节点【${pid}】的范围内!`;


    function eachRowDatas (keys: Object = {}) {

      return (callback = (keys: Object, data: Object) => {}) => {
        datas.forEach((data: Object) => {
          const { key, } = data;
          keys[ key ] = data;
          callback && callback(keys, data);
        });
      };
    }

    const keys = {},
      pids = [];
    eachRowDatas(keys)((keys: Object, data: Object) => {
      const { pid, } = data;
      if (notEmpty(pid)) {
        pids.push(pid);
      }
    });

    pids.forEach(pid => {
      if (!notEmpty(keys[ pid ])) {
        result.push(pidIsNotExist(pid));
      }
    });

    if (result.length > 0) {
      return result;
    }

    const key2PidIndex = {};
    let index = 0;
    eachRowDatas()((keys: Object, data: Object) => {
      const { pid, key, } = data;
      key2PidIndex[ key ] = index++;
      if (notEmpty(pid)) {
        if (!keys[ pid ]) {
          result.push(levelIsError(data));
        }
      }
    });

    const fetchPidPath = function (pid) {
      const pidPath = [];
      let node = keys[ pid ];
      while ( node ) {
        const { key, pid, } = node;
        pidPath.push(key);
        node = keys[ pid ];
      }
      return pidPath.reverse();
    };

    const pathIsError = ({ key, }) => `${key}结点path信息错误!`;
    const isPathError = {};
    datas.forEach((data: Object, index: number) => {
      const { pid, path, key, } = data;
      if (pid) {
        const pidPathArray = fetchPidPath(pid);
        const pidPath = pidPathArray.join('/');
        if (pidPath !== path) {
          isPathError[ key ] = true;
          result.push(pathIsError(data));
        }
      }
    });

    datas.forEach((data: Object, index: number) => {
      const { pid, } = data;
      if (pid) {
        const pidPathArray = fetchPidPath(pid);
        const pathIndex = pidPathArray.map(pid => key2PidIndex[ pid ]);
        const pathLen = pathIndex.length;
        if (pathLen > 0) {
          const start = pathIndex[ pathLen - 1 ];
          const { path, key, } = datas[ start ];
          const prePath = (path ? `${path}/` : '') + key;
          for (let i = start + 1; i < index; i++) {
            const node = datas[ i ];
            const { path, } = node;
            if (path) {
              if (!path.startsWith(prePath) && !isPathError[ data.key ]) {
                result.push(levelIsError(data));
                break;
              }
            }
          }
        }
      }
    });


    return result;
  }


  generateTreeNode (rowData: Array<RowData>): Array<RowData> {
    const result = [];
    if (rowData) {
      const node = {};
      rowData.forEach(data => {
        const row = { ...data, };
        const { pid, key, } = row;
        node[ key ] = row;
        if (pid) {
          const parent = node[ pid ];
          let { children, } = parent;
          if (!children) {
            children = [];
            parent.children = children;
          }
          children.push(row);
        } else {
          result.push(node[ key ]);
        }
      });
    }
    return result;
  }

  slice (rowDatas: Array<RowData>, start: number, total: number, expandInfo?: ExpandInfo): Array<RowData> {
    if (rowDatas && rowDatas.length === 0) {
      return [];
    }

    const root = rowDatas[ start ];
    if (!root) {
      console.error('树形数据存在问题');
      return [];
    }

    const isTopLevel = !root.pid;
    if (isTopLevel) {
      return this.sliceExpand(rowDatas, start, total, expandInfo);
    }

    const pathNode = this.getPathNodes(rowDatas, start, root.pid);
    return this.sliceExpand(rowDatas, start, total, expandInfo, pathNode);
  }

  sliceExpand (rowDatas: Array<RowData>, start: number, total: number, expandInfo?: ExpandInfo, parentNode?: Array<RowData> = []): Array<RowData> {

    if (!expandInfo) {
      return rowDatas.slice(start, start + total);
    }
    const { target, expandedAll, } = expandInfo;

    const result = [];
    let foundRow: number = 0;
    let inCollapseRange: boolean = false;
    let collapsePath: ?string = null;

    const processRow = (needComput: ?boolean = true) => (row: RowData) => {
      const { key, path, } = row;

      if (inCollapseRange) {
        if (!path || collapsePath === null || collapsePath === undefined || !path.startsWith(collapsePath)) {
          inCollapseRange = false;
        }
      }

      if (!inCollapseRange) {
        result.push(row);
        if (needComput) {
          foundRow++;
        }
      }

      const isNotExpanded = expandedAll ? target[ key ] : !target[ key ];

      if (!inCollapseRange && isNotExpanded) {
        inCollapseRange = true;
        collapsePath = key;
        if (path) {
          collapsePath = `${path}/${collapsePath}`;
        }
      }
    };

    parentNode.forEach(processRow(false));
    const processRowForRowDatas = processRow();
    for (let i = start; foundRow < total && i < rowDatas.length; i++) {
      const row = rowDatas[ i ];
      processRowForRowDatas(row);
    }

    return result;
  }

  getPathNodes (rowDatas: Array<RowData>, start: number, targetPid?: string) {
    const result = [];
    if (!targetPid) {
      return result;
    }
    for (let findPidIdx = start; findPidIdx >= 0; findPidIdx--) {
      const node = rowDatas[ findPidIdx ];
      const { key, pid, } = node;
      if (key === targetPid) {
        result.push(node);
        if (!pid) {
          break;
        }
        targetPid = pid;
      }
    }
    return result.reverse();
  }

  getKeys (nodes: Array<RowData>): Array<string> {
    const result = [];
    nodes && nodes.forEach((node: RowData) => {
      const { key, } = node;
      result.push(key);
    });
    return result;

  }

}

const utils: TreeUtils = new TreeUtils();
export default utils;
