//二叉树构造函数(链式结构)
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
//三叉树结构
function Node(val, left, right, next) {
    this.val = (val === undefined ? null : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
    this.next = (next === undefined ? null : next);
}

/**
 * 
 * @param {number} index 
 * @returns {TreeNode|null}
 * 使用层序遍历找某个孩子, 从0下标开始,找不到返回null
 * 注: null节点不算下标范围内
 */
TreeNode.prototype.get = function(index) {
    if(this === null) return null;
    const queue = [];
    let cur_size = 0;//记录当前层需要弹出多少个元素
    let count = -1;// 记录已经遍历了多少个元素, 当count == index时 return
    queue.push(this);
    while(queue.length !== 0) {
        cur_size = queue.length;
        //弹出当前层的元素
        while(cur_size--) {
            const node = queue.shift();
            count++;
            if(index === count) return node;
            if(node.left !== null) queue.push(node.left);
            if(node.right !== null) queue.push(node.right);
        }
    }
    //找不到的情况(例如:下标越界)
    return null;
}

/**
 * 
 * @param {number[]} nums 
 * @returns {TreeNode}
 * 云层遍历实现给定一个数组生成一颗二叉树
 */
const build_tree = (nums) => {
    //控制元素下标, 但null不会移动下标
    let i = 0;
    let root = new TreeNode(nums[0]);//根节点
    const queue = [];//null节点需入队列
    queue.push(root);//数组第一个元素入队列
    while(queue.length !== 0) {
        // 1.  弹出队列首元素
        const node = queue.shift();
        if(node === null) continue;
        //在最后元素的左右孩子越界, 添加条件判断,超出边界就不为队列添加数值
        const left = 2 * i + 1;//左孩子下标
        const right = 2 * i + 2;//右孩子下标
        if(left < nums.length) {
            //因为数组中可能有着null节点, 所以需要做个判断
            const left_node = nums[left] !== null ? new TreeNode(nums[left]) : null;
            queue.push(left_node);
            node.left = left_node;
        }
        if(right < nums.length) {
            const right_node = nums[right] !== null ? new TreeNode(nums[right]) : null;
            queue.push(right_node);
            node.right = right_node;
        }
        //每弹出一个元素, 索引加加
        i++;
    }
    return root;
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 二叉树中序遍历迭代法
 */
var inorderTraversal = function (root) {
    /**
          中序遍历 ===> 左中右
          先用指针实现
      */
    const result_arr = [];
    const stack = [];
    //使用cur指针遍历二叉树
    let cur = root;
    /*
          栈为空且cur指针的位置也为空退出循环
          1. 栈不为空cur而null时, 会弹出栈顶元素
      */
    while (cur !== null || stack.length !== 0) {
        if (cur !== null) {
            stack.push(cur);
            cur = cur.left;
        } else {
            cur = stack.pop();
            result_arr.push(cur.val);
            cur = cur.right;
        }
    }
    return result_arr;
};


/**
 * @param {TreeNode} root
 * @return {number[][]}
 * 二叉树层序遍历
 */
var levelOrder = function (root) {
    //因为null不如队列, 所以root为null时直接返回空数组
    if (root === null) return [];
    //null不入队列
    const result_arr = []; //结果集
    const queue = []; //队列
    //记录当前层的节点个数, 如果没有控制弹出个数就乱了
    let cur_size = 0;
    /*
          记录相对于当前层下一层节点个数
          注: 也可以不使用next_size变量, 因为下一层的元素个数
          其实就是当前层的元素都弹出后队列剩下的元素个数的值
      */
    let next_size = 0;
    //头节点入队列
    queue.push(root);
    //当前层数量+1
    cur_size++;
    while (queue.length !== 0) {
        //一层的结果集
        const result_tmp = [];
        //弹出当前层队列头元素, 这里也体现了记录当前层个数的重要性
        while (cur_size--) {
            //弹出当前层队列头元素
            const node = queue.shift();
            result_tmp.push(node.val);
            //左右节点存在则为下一层的元素个数+1
            if (node.left !== null) {
                queue.push(node.left);
                next_size++;
            }
            if (node.right !== null) {
                queue.push(node.right);
                next_size++;
            }
        }
        //让当前层节点个数等于下一层节点个数
        cur_size = next_size;
        //下一层清0, 重新开始计算
        next_size = 0;
        //放入最终结果集
        result_arr.push(result_tmp);
    }
    return result_arr;
};

/**
 * @param {Node} root
 * @return {Node}
 * 
 * 116.填充每个节点的下一个右侧节点指针
 */
var connect = function (root) {
    //因为null不如队列, 所以root为null时直接返回空数组
    if (root === null) return null;
    //null不入队列
    const result_arr = []; //结果集
    const queue = []; //队列
    //记录当前层的节点个数, 如果没有控制弹出个数就乱了
    let cur_size = 0;
    /*
          记录相对于当前层下一层节点个数
          注: 也可以不使用next_size变量, 因为下一层的元素个数
          其实就是当前层的元素都弹出后队列剩下的元素个数的值
      */
    let next_size = 0;
    //头节点入队列
    queue.push(root);
    //当前层数量+1
    cur_size++;
    while (queue.length !== 0) {
        //一层的结果集
        const result_tmp = [];
        //弹出当前层队列头元素, 这里也体现了记录当前层个数的重要性
        while (cur_size--) {
            //弹出当前层队列头元素
            const node = queue.shift();
            if(cur_size === 0) {
                node.next = null;
            } else {
                node.next = queue[0];
            }
            //左右节点存在则为下一层的元素个数+1
            if (node.left !== null) {
                queue.push(node.left);
                next_size++;
            }
            if (node.right !== null) {
                queue.push(node.right);
                next_size++;
            }
        }
        //让当前层节点个数等于下一层节点个数
        cur_size = next_size;
        //下一层清0, 重新开始计算
        next_size = 0;
    }
    return root;
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 * 226. 翻转二叉树
 */
var invertTree = function(root) {
    if(root === null) return null;
    function resevre(root) {
        /**
            使用前序或后序
        */
        //只要有一个等于null就不管
        if(root === null) {
            return;
        }
        //翻转二叉树
        const tmp = root.left;//中
        root.left = root.right;//中
        root.right = tmp;//中
        resevre(root.left);//左
        resevre(root.right);//右
    }
    resevre(root);
    return root;
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 * 101. 对称二叉树
 */
var isSymmetric = function(root) {
    //使用前序遍历, 左子树使用"中左右"; 右子树使用"中右左"
    //这个函数需要同时操控两颗树,进行向下移动来判断是否对称
    /**
     * 
     * @param {TreeNode} left 左节点
     * @param {TreeNode} right 右节点
     * @returns {boolean}
     */
    function traversal(left, right) {
        /*确定终止条件
            1. 左为null, 右不为null 返回false
            2. 左不为null, 右为null 返回 false
            3. 节点的val值不同 返回false
            4. 值都为null 返回true
            5. 左右节点不为null, 且值相同继续向下遍历
        */
        if(left === null && right !== null) return false;
        if(left !== null && right === null) return false;
        if(left === null && right === null) return true;
        if(left.val !== right.val) return false;
        //确定单层逻辑 下列就是左右节点不为null, 且值相同继续向下遍历
        const outside = traversal(left.left, right.right);//外侧
        if(!outside) return outside;
        const inside = traversal(left.right, right.left);//内测
        if(!inside) return inside;
        return outside && inside;
    }
    return traversal(root.left, root.right);
};

/**
 * 
 * @param {TreeNode} root 
 * 
 * 递归三部曲
 * 1. 确定递归函数的参数和返回值
 * 2. 确定终止条件
 * 3. 确定单层递归的逻辑
 */
var get_height = (root) => {
    //当子树为null时, 将信息传递给上层做+1操作
    if(root === null) return 0;
    //左子树
    const left_height = get_height(root.left);
    //右子树
    const right_height = get_height(root.right);
    /*
        将左子树和右子树做一个取最大值
    */
    const result = Math.max(left_height, right_height);
    return 1 + result;
}

/**
 * @param {TreeNode} root
 * @return {number}
 * 104. 二叉树的最大深度
 */
var maxDepth = function(root) {
    /*
        后序遍历求的是"高度"; 前序遍历求的才是"深度", 但求深度的代码会有些麻烦
        根节点的高度就是就是二叉树的最大深度
    */
    
    return get_height(root);
};

/**
 * @param {TreeNode} root
 * @return {number}
 * 最小深度
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量
 * 说明：叶子节点是指没有子节点的节点
 */
var minDepth = function(root) {
    /** 
        递归三部曲
        1. 确定函数参数和返回值
        2. 确定终止条件
        3. 单层逻辑
    */
    if(root === null) return 0;
    const left_height = minDepth(root.left);
    const right_height = minDepth(root.right);
    //左右若有一个null节点就将另外一边的节点的长度+1返回过去
    if(root.left === null && root.right !== null) {
        return 1 + right_height;
    }
    if(root.right === null && root.left !== null) {
        return 1 + left_height;
    }
    const result = Math.min(left_height, right_height);
    return 1 + result;
};

/**
 * @param {TreeNode} root
 * @return {number}
 * 完全二叉树的数量
 */
var countNodes = function(root) {
    //终止条件1
    if(root === null) return 0;
    /** 
        因为有着安全二叉树的特性, 在时间复杂度超过O(n)的情况,
        只要当前树的两外侧深度相等,就可以使用公式(2 * depth的次方) - 1
        因为题目给的一定是"完全二叉树",所以不用担心外侧长度是相等的,而内测不相等的情况
    */
    //终止条件2, 判断外侧长度是否相等
    let left = root.left;
    let right = root.right;
    let left_depth = 1;
    let right_depth = 1;
    while(left !== null) {
        left = left.left;
        left_depth++;
    }
    while(right !== null) {
        right = right.right;
        right_depth++;
    }
    //题目给的一定是符合完全二叉树
    if(left_depth === right_depth) return Math.pow(2, left_depth) - 1;// 2^n - 1, 即这个满二叉树的数量
    //正常后序遍历
    const left_height = countNodes(root.left);
    const right_height = countNodes(root.right);
    return left_height + right_height + 1; 
};


var get_height = (root) => {
    // "-1" 作为不是平衡二叉树的标志
    if(root === null) return 0;
    const left_height = get_height(root.left);
    //左子树已经不是平衡二叉树了, 就没有必要计算下去了, 所以一直向上返回-1
    if(left_height === -1) return -1;
    const right_height = get_height(root.right);
    if(right_height === -1) return -1;
    /*
        1. 判断自己是否是平衡二叉树. 前面的判断只是判断子树是否是平衡二叉树
        2. 若是, 则应该返回自己的最大深度; 不是则返回-1
    */
    let result;
    // 左右子树的深度相差超过"-1"
    if(Math.abs(left_height - right_height) > 1) {
        result = -1;
    } else {
        //反之, result = 自己的最大深度
        result = 1 + Math.max(left_height, right_height);
    }
    return result;

} 

/**
 * @param {TreeNode} root
 * @return {boolean}
 * 平衡二叉树
 * 是指该树所有节点的左右子树的深度相差不超过 1。
 */
var isBalanced = function(root) {
    return get_height(root) === -1 ? false : true;
};
/**
 * 
 * @param {TreeNode} node 
 * @param {number[]} result_arr 
 * @param {string} cur_leaf 
 * @returns {void}
 * 1. 确定参数和返回值
 */
var get_branch = (node, result_arr, cur_leaf) => {
    // 2. 确定终止条件, 因为力扣上需要加上"->"所以终止条件应该是左右节点为null, 而不仅仅是node节点为null
    if(node.left === null && node.right === null) {
        //拼接字符串
        cur_leaf += node.val;
        result_arr.push(cur_leaf);
        return;
    }
    // 3. 确定单层逻辑
    cur_leaf += (node.val + "->");//拼接字符串
    if(node.left !== null) {
        get_branch(node.left, result_arr, cur_leaf);
    }
    if(node.right !== null) {
        get_branch(node.right, result_arr, cur_leaf);
    }
}

/**
 * @param {TreeNode} root
 * @return {string[]}
 * 返回叶子路径
 */
var binaryTreePaths = function(root) {
    const result_arr = [];

    get_branch(root, result_arr, "");
    return result_arr;
};


/**
 * @param {TreeNode} root
 * @return {number}
 * 左叶子之和
 */
var sumOfLeftLeaves = function(root) {
    // 2. 终止条件
    if(root === null) return 0;
    /*
        这条语句不要也可以, 但当遍历到叶子节点(左右孩子为null)时
        结果肯定不在, 所以要尽早return, 防止多遍历几回
        注意点: 这里不能直接返回root.val什么的, 因为无法判断是左还是右子节点
    */
    if(root.left === null && root.right === null) return 0;
    /*
        如果当前节点的位置在叶子节点, 这样时无法判断这个叶子节点是左叶子节点还是右叶子节点的
        要想判断是左还是右, 应该已父节点的位置, 来判断左叶子节点(左右孩子为null)
    */
    let left_sum = get_sum(root.left);
    if(root.left !== null && root.left.left === null && root.left.right === null) {
        left_sum = root.left.val;
    }
    let right_sum = get_sum(root.right);
    return left_sum + right_sum;
};

/**
 * @param {TreeNode} root
 * @return {number}
 * 513. 找树左下角的值
 */
var findBottomLeftValue = function(root) {
    //最大深度
    let max_depth = 0;
    let result = 0;
    let get_left_val = (node, depth) => {
        // 因为先遍历的是"左"然后是右, 这时如果depth相同的话result就不会是"右叶子节点"
        if(node.left === null && node.right === null) {
            //当节点的左右子节点都没有时, 为终止条件
            if(depth > max_depth) {
                max_depth = depth;
                result = node.val;
                return;
            }
        }
        //3. 单层逻辑
        //因为node.left有可能是空指针, 所以在递归时, 需要判断左右子节点是否为null
        if(node.left !== null) {
            depth++;
            get_left_val(node.left, depth);
            //回溯的过程
            depth--;
        }
        if(node.right !== null) {
            depth++;
            get_left_val(node.right, depth);
            //回溯的过程
            depth--;
        }
    }
    get_left_val(root, 1);
    return result;
};

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 * 112. 路径总和
 */
var hasPathSum = function(root, targetSum) {
    /**
     * 
     * @param {TreeNode} node 
     * @param {number} path_sum 
     * @returns {boolean}
     */
    let get_path = (node, path_sum) => {
        //当前节点为叶子节点时, 就是判断这条路径是否为"targetSum"的时候
        if(node.left === null && node.right === null) {
            path_sum += node.val;
            //只要一条路径等于true就可以, 最终应使用||元素符来return
            if(path_sum === targetSum) return true;
        }
        //单层逻辑
        path_sum += node.val;
        let left_path = false;
        let right_path = false;
        if(node.left !== null) {
            left_path = get_path(node.left, path_sum);
        }
        if(node.right !== null) {
            right_path = get_path(node.right, path_sum);
        }
        return left_path || right_path;
    }
    return get_path(root, 0);//从0开始递增
};

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 * 112. 路径总和(更优解)
 */
var hasPathSum = function(root, targetSum) {// 一步一步递减,最终叶子节点的路径值为0就返回true
    let travelsal = (node, count) => {
        if(node.left === null && node.right === null && count === 0) return true;
        if(node.left === null && node.right === null && count !== 0) return false;
        if(node.left !== null) {
            count -= node.left.val;
            if(travelsal(node.left, count)) return true;
            count += node.left.val;
        }
    
        if(node.right !== null) {
            count -= node.right.val;
            if(travelsal(node.right, count)) return true;
            count += node.right.val;
        }
        return false;
    }

    return travelsal(root, targetSum - root.val);
};

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 * 106. 从中序与后序遍历序列构造二叉树
 * inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历
 */
var buildTree = function(inorder, postorder) {
    /** 
        思路1: 中序(左中右); 后序(左右中)
        中序:[9,3,15,20,7]; 后序:[9,15,7,20,3]
        后续数组的最后一位就是"中", 也就是节点元素, 那么这个"中"(中序数组)的左边就是他的左子节点
        右边就是右子节点, 分割然后递归
    */
    // 2. 确定终止条件
    if(postorder.length === 0) return null;//例如: 左节点或右节点为null时返回null
    //根元素值
    const root_value = postorder.pop();
    //创建根节点
    const root = new TreeNode(root_value, null, null);
    //遇到叶子节点时, 直接返回root节点
    if(postorder.length === 0) return root;
    //3. 确定单层逻辑
    //通过根元素值分割中序数组, 首先找到根元素下标位置
    let index;
    for(index = 0; index < inorder.length; index++) {
        if(inorder[index] === root_value) break;
    }
    /** 
        库函数形式:左闭右开
        通过根元素下标位置分割中序数组
    */
    const in_left = inorder.slice(0, index);//左中序
    //右中序
    const in_right = inorder.slice(index + 1);//左闭,但第index个元素不需要, 所以在个1
    //通过左中序数组分割后序数组
    const post_left = postorder.slice(0, in_left.length);// 中序数组的长度就是end处
    const post_right = postorder.slice(in_left.length);
    root.left = buildTree(in_left, post_left);
    root.right = buildTree(in_right, post_right);
    return root;
};
/**
 * 
 * @param {number[]} nums 
 * @returns {number[]}
 */
const max_value = (nums) => {
    //最大值
    let max = -1;
    //最大值下标
    let index_max = -1;
    nums.forEach((e, i) => {
        if(e > max) {
            max = e;
            index_max = i;
        }
    })
    return [max, index_max];
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 * 654. 最大二叉树 ==== 分割数组版会额外开辟新数组
 */
var constructMaximumBinaryTree = function(nums) {
    //构造二叉树的题目一定要使用前序遍历(中左右). 
    //确定终止条件
    if(nums.length === 0) return null;//左右子树为null或者某一个直接返回null
    //找nums的最大值和最大值的下标
    const [max, index] = max_value(nums);
    //构建二叉树根节点
    const root = new TreeNode(max, null, null);//中
    //通过最大值下标分割nums数组. slice库函数形式为:左闭右开
    const left = nums.slice(0, index);
    const right = nums.slice(index + 1);
    root.left = constructMaximumBinaryTree(left);//左
    root.right = constructMaximumBinaryTree(right);//右
    return root;
};
//操作下标版
var constructMaximumBinaryTree = function (nums) {
    const BuildTree = (arr, left, right) => {
        if (left > right)
            return null;
        let maxValue = -1;
        let maxIndex = -1;
        //获得最大值和下标
        for (let i = left; i <= right; ++i) {
            if (arr[i] > maxValue) {
                maxValue = arr[i];
                maxIndex = i;
            }
        }
        let root = new TreeNode(maxValue);
        root.left = BuildTree(arr, left, maxIndex - 1);
        root.right = BuildTree(arr, maxIndex + 1, right);
        return root;
    }
    let root = BuildTree(nums, 0, nums.length - 1);//左右下标
    return root;
};

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 * 617. 合并二叉树
 */
var mergeTrees = function(root1, root2) {
    /*
        两者都为null的情况下, 返回对方, 也就还是返回null
        二叉树只要有一方为null, 就应该返回对方
        因为两颗树是同步进行的, 所以位置相同
    */
    if(root1 === null) return root2;
    if(root2 === null) return root1;
    //确定单层逻辑
    root1.val += root2.val;//中
    root1.left = mergeTrees(root1.left, root2.left);//左
    root1.right = mergeTrees(root1.right, root2.right);//右
    return root1;
};

const head_5 = build_tree([1,3,2,5]);
const head_6 = build_tree([2,1,3,null,4,null,7]);

const mergeTrees_result = mergeTrees(head_5, head_6);



/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 * 700. 二叉搜索树中的搜索(递归)
 */
var searchBST = function(root, val) {
    //确定终止条件
    if(root === null || root.val === val) return root;
    let result;//目标值
    //二叉搜索树的特性:左节点的值一定小于根节点; 右节点一定大于根节点
    if(root.val > val) {
        result = searchBST(root.left, val);
    }
    if(root.val < val) {
        result = searchBST(root.right, val);
    }
    return result;
};

var searchBST = function(root, val) {
    let cur = root;
    while(cur !== null) {
        if(cur.val === val) return cur;
        if(cur.val > val) {
            cur = cur.left;
        } else {
            cur = cur.right;
        }
    }
    //循坏结束, 则代表没有return值, cur为null, 直接返回null
    return null;
}
const searchBST_head_1 = build_tree([4,2,7,1,3, null, 8]);
const searchBST_result = searchBST(searchBST_head_1, 3);

/**i
 * @param {TreeNode} root
 * @return {boolean}
 * 98. 验证二叉搜索树
 */
var isValidBST = function(root) {
    //中序遍历
    let max = 0;
    function isvalid(node) {
        //确定终止条件
        if(node === null) return true;//遇到null节点返回true. 在中序遍历,值一定是递增的, 通过是否递增来去确定是否返回false
        const left = isvalid(node.left);
        //存在的问题可能是"node.val在最的最小节点比max的初始值还要小"
        if(node.val > max) {
            max = node.val;
        } else {
            return false;
        }
        const right = isvalid(node.right);
        return left && right;
    }
    return isvalid(root);
};
/**
 * @param {TreeNode} root
 * @return {boolean}
 * 98. 验证二叉搜索树
 */
var isValidBST = (root) => {
    /* 思路: 一般用来验证二叉树, 都是使用中序遍历, 因为根据二叉搜索树的特性
    所得到的结果一定是递增的数组. 根据这特性来验证二叉搜索树
    使用"pre"变量代替"最大值变量", 因为最大值变量在初始化时不一定就是最大的变量 */
    let pre = null;
    function isValid(node) {
        //遇到null节点返回true. false的判断应在"中"的位置, 即节点是否是递增的趋势
        if(node === null) return true;
        const left = isValid(node.left);
        // 在中序遍历,值一定是递增的, 通过是否递增来去确定是否返回false
        if(pre !== null && pre.val >= node.val) return false;
        pre = node;
        const right = isValid(node.right);
        return left && right;
    }
    //每个子树都可以是中节点
    return isValid(root);
}


const isValidBST_head_1 = build_tree([5,3,10,1,null,6,11]);
const isValidBST_head_2 = build_tree([2,1,3]);
const isValidBST_head_3 = build_tree([5,1,4,null,null,3,6]);

const isValidBST_result = isValidBST(isValidBST_head_1);

function inorderTravers(root, result_arr) {
    //确定终止条件
    if(root === null) return;
    inorderTravers(root.left, result_arr);
    result_arr.push(root.val);
    inorderTravers(root.right, result_arr);
}

/**
 * @param {TreeNode} root
 * @return {number}
 * 530. 二叉搜索树的最小绝对差
 */
var getMinimumDifference = function(root) {
    //双指针. 一个指针cur指向当前节点, 另一个指针pre指向cur的前一个节点
    let pre = null;
    let result = 100001;//取个最大的值(力扣上的最大值为100000)
    /**
     * 
     * @param {TreeNode} cur 
     * @returns {void}
     */
    let travelsal = (cur) => {
        if(cur === null) return;
        travelsal(cur.left);
        if(pre !== null) {
            result = Math.min(result, cur.val - pre.val);
        }
        pre = cur;
        travelsal(cur.right);

    }
    travelsal(root);
    return result;
};

const getMinimumDifference_head_1 = build_tree([5, 3, 10, 1, null, 6, 11]);
const getMinimumDifference_result = getMinimumDifference(getMinimumDifference_head_1);

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 501. 二叉搜索树中的众数
 * 此题满足:
 * 结点左子树中所含节点的值 "小于等于" 当前节点的值
 * 结点右子树中所含节点的值 "大于等于" 当前节点的值
 */
var findMode = function(root) {
    //双指针cur, pre和中序遍历. 根据二叉搜索树的特性,众数出现的位置一定在相邻的元素之间
    const result_arr = [];
    let pre = null;
    let maxCount = 0;//记录最大次数
    let count = 0;//记录当前元素次数
    /**
     * 
     * @param {TreeNode} cur 
     * @returns {void}
     */
    let travelsal = (cur) => {
        if(cur === null) return;
        travelsal(cur.left);//左
        //单层逻辑
        if(pre === null) {//pre指针指向null, 则已经有一个元素出现
            count = 1;
        } else if(pre.val === cur.val) {//不为null且相等
            count++;
        } else {//不为null也不相等
            count = 1;
        }
        pre = cur;
        if(count === maxCount) result_arr.push(cur.val);
        if(count > maxCount) {
            maxCount = count;//更新最大次数
            result_arr.length = 0;//清空数组
            result_arr.push(cur.val);//将最新的众数放在数组中
        }
        travelsal(cur.right);
    }
    travelsal(root);
    return result_arr;
};

const findMode_head_1 = build_tree([5,2,6,2, null, 6, null]);

const findMode_head_2 = build_tree([5,2,6,2,null,6,null]);

const findMode_result_1 = findMode(findMode_head_1);

const findMode_result_2 = findMode(findMode_head_2);

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 * 236. 二叉树的最近公共祖先
 */
var lowestCommonAncestor = function(root, p, q) {//确定参数和返回值
    //二叉树想要从下往上走, 就需要使用后序遍历
    //2. 确定终止条件
    if(root === null) return null;//可以想一个最极端的, 即root等于null应该返回什么
    if(root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);//左
    const right = lowestCommonAncestor(root.right, p, q);//右
    /*
        在下列"中"的逻辑
        1. 若当前"中"节点的左右子节点都为null, 最终也应该返回"null"
        2. 若当前"中"节点的左右子节点的val满足"p"和"q", 则返回自己, 最近公共祖先
        3. 若当前"中"节点的左右子节点的val只满足"p"或"q", 则返回满足条件的"p"或"q"
    */
    if(left !== null && right !== null) {
        //即找到了q和p, 直接返回自己, 因为自己就是"二叉树的最近公共祖先"
        return root;
    } else if(left !== null && right === null) {
        return left;
    } else if(right !== null && left === null) {
        return right;
    } else {
        //left和right都为null
        return null;
    }
};

const lowestCommonAncestor_head_1 = build_tree([3,5,1,6,2,0,8,null,null,7,4]);
const lowestCommonAncestor_p = lowestCommonAncestor_head_1.get(7);
const lowestCommonAncestor_q = lowestCommonAncestor_head_1.get(8);

const lowestCommonAncestor_result = lowestCommonAncestor(lowestCommonAncestor_head_1, lowestCommonAncestor_p, lowestCommonAncestor_q);


 /**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 * 235. 二叉搜索树的最近公共祖先
 */
var lowestCommonAncestor = function(root, p, q) {
    /* 此题没有顺序遍历, 因为二叉搜索树自己就有着特征 
       1. 如果当前节点值大于p和q的值, 则最近公共祖先一定在"左子树"中
       2. 如果当前节点值小于p和q的值, 则最近公共祖先一定在"右子树"中
       3. 当节点值首次出现在p和q的值之间, 则这个节点就是"最近公共祖先"
    */
    if(root === null) return null;
    let left = null;
    let right = null;
    //单层逻辑
    if(root.val > p.val && root.val > q.val) {
        left = lowestCommonAncestor(root.left, p, q);
        if(left !== null) return left;
    }
    if(root.val < p.val && root.val < q.val) {
        right = lowestCommonAncestor(root.right, p, q);
        if(right !== null) return right;
    }
    return root;
};

 /**
 * @param {TreeNode} cur
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 * 235. 二叉搜索树的最近公共祖先(迭代饭)
 */
var lowestCommonAncestor = function(cur, p, q) {
    while(cur !== null) {
        if(cur.val > p && cur.val > q) {
            cur = cur.left;
        } else if(cur.val < p && cur.val < q) {
            cur = cur.right;
        } else {
            return cur;
        }
    }
    return null;
};

const lowestCommonAncestor_head_2 = build_tree([6,2,8,0,4,7,9,null,null,3,5]);

const lowestCommonAncestor_1_p = lowestCommonAncestor_head_2.get(7);
const lowestCommonAncestor_1_q = lowestCommonAncestor_head_2.get(8);

const lowestCommonAncestor_result_2 = lowestCommonAncestor(lowestCommonAncestor_head_2, lowestCommonAncestor_1_p, lowestCommonAncestor_1_q);

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 * 701. 二叉搜索树中的插入操作
 */
var insertIntoBST = function(root, val) {
    // 插入方式: "只是插入节点, 但确定的节点完全没修改过"
    if(root === null) return new TreeNode(val);
    /**
     * 
     * @param {TreeNode} cur 
     * @param {number} val
     * @returns {void} 
     */
    const traversal = (cur, val) => {// 1. 确定参数和返回值
        //想象一个最极端的方式, cur为null, 那么这是应该返回一个节点,并且值为"null"
        // 2. 确定终止条件
        if(cur.val > val && cur.left === null) {
            cur.left = new TreeNode(val);
            return;
        }
        if(cur.val < val && cur.right === null) {
            cur.right = new TreeNode(val);
            return;
        }
        //3. 确定单层逻辑
        if(cur.val > val) {
            //在左
            traversal(cur.left, val);
        }
        if(cur.val < val) {
            traversal(cur.right, val);
        }

    }
    traversal(root, val);
    return root;
};

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 * 701. 二叉搜索树中的插入操作
 */
var insertIntoBST = function(root, val) {// 插入方式: "会对树结构进行重新赋值"
    //确定终止条件, 想象一个最简单的例子, root为null这是就应该直接返回val节点
    if(root === null) return new TreeNode(val);
    //根据二叉搜索树的特性只会走一边, 另一边原封不动
    if(root.val > val) {
        root.left = insertIntoBST(root.left, val);
    }
    if(root.val < val) {
        root.right = insertIntoBST(root.right, val);
    }
    return root;

}

const insertIntoBST_head_1 = build_tree([4,2,7,1,3]);

const insertIntoBST_result = insertIntoBST(insertIntoBST_head_1, 0);

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 * 450. 删除二叉搜索树中的节点
 */
var deleteNode = function(root, key) {//1. 确定参数和返回值
    /*  删除的节点逻辑写在终止条件中(采用向上传值)
        1. 当前节点为null
        2. 当前为叶子节点
        3. 当前节点的左孩子不为null, 右孩子为null
        4. 当前节点的左孩子为为null, 右孩子不为null
        5. 当前节点的左右孩子都不为null
    */
    //2. 确定终止条件
    if(root === null) return null;//想一个极端的例子, 根节点为null应该返回什么
    if(root.val === key && root.left === null && root.right === null) return null;//因为采用的是向上传值, 所以返回null, 以此到达"删除节点"
    if(root.val === key && root.left !== null && root.right === null) return root.left;
    if(root.val === key && root.right !== null && root.left === null) return root.right;
    if(root.val === key && root.left !== null && root.right !== null) {
        //采用方式: 将当前节点的左子树, 放在右子树上. 为了不破坏二叉搜索树特性, 因把左子树放在比需要删除的元素大一点的节点上, 也就是右子树中最小的元素
        let cur = root.right;
        //因为获得右子节点的最小值不一定只有一层, 所以使用循环
        while(cur.left !== null) cur = cur.left;
        //这是cur.left为null, 放置左子树
        cur.left = root.left;
        //接下来的逻辑就相当于"当前节点的左孩子为为null, 右孩子不为null"
        return root.right;
    }
    //单层逻辑
    if(root.val > key) {
        root.left = deleteNode(root.left, key);
    }
    if(root.val < key) {
        root.right = deleteNode(root.right, key);
    }
    return root;
};

const deleteNode_head_1 = build_tree([3,2,7,1,null,5,9,null,null,null,null,4,6,8,10]);

const deleteNode_result = deleteNode(deleteNode_head_1, 7);

/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 * 669. 修剪二叉搜索树
 */
var trimBST = function(root, low, high) {
    /*
        这个地方无法使用二叉搜索树的特性只走一条路, 因为两边可能都会有着符合条件的节点
        1. 如果当前节点值小于左边界"low", 那么当前节点的右节点可能存在符合条件的节点
        2. 如果当前节点值大于右边界"high", 那么当前节点的左节点可能存在符合条件的节点
    */
    if(root === null) return null;
    //左边和右边的逻辑需要单独处理
    if(root.val < low) {
        //当前节点的右节点有可能有着符合条件的节点
        const right = trimBST(root.right, low, high);
        return right;
    }
    if(root.val > high) {
        //当前节点的左节点有可能有着符合条件的节点
        const left = trimBST(root.left, low, high);
        return left;
    }
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
};

const trimBST_head_1 = build_tree([1,0,2]);
const trimBST_head_2 =  build_tree([7,0,9,null,3,null,null,2,null,1]);

const trimBST_result_1 = trimBST(trimBST_head_1,1,2);
const trimBST_result_2 = trimBST(trimBST_head_2,2,7);

/**
 * @param {number[]} nums
 * @return {TreeNode}
 * 108. 将有序数组转换为二叉搜索树
 */
var sortedArrayToBST = function(nums) {
    //如果数组什么都没有就没有必要加节点了, 直接返回null
    if(nums.length === 0) return null;

    //单层逻辑
    const middle = Math.floor(nums.length / 2);//中间元素下标
    const node = new TreeNode(nums[middle], null, null);
    //切割数组
    const left = nums.slice(0, middle);
    node.left = sortedArrayToBST(left);
    const right = nums.slice(middle + 1, nums.length);
    node.right = sortedArrayToBST(right);
    return node;
};

var sortedArrayToBST = function(nums) {
    /**
     * 
     * @param {number[]} nums 
     * @param {number} right 控制下标右边界
     * @param {number} left 控制下标左边界
     * 
     */
    let traversal = (nums, left ,right) => {
        //想象一下nums数组中只有一个元素, 这时left和right指向同一个元素, 如果等于返回null就错过了这唯一的节点
        if(left > right) return null;
        const middle = Math.floor((right + left) / 2);
        const node = new TreeNode(nums[middle], null, null);
        node.left = traversal(nums, left, middle - 1);
        node.right = traversal(nums, middle + 1, right);
        return node;
    }
    const result = traversal(nums, 0, nums.length - 1);
    return result;
};

//数组是有序的
const sortedArrayToBST_result = sortedArrayToBST([-10,-3,0,5,9]);

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 * 538. 把二叉搜索树转换为累加树 (使用累加值的方式)
 */
var convertBST = function(root) {
    /*
        中序遍历, 但使用的是"右中左"
        [0,1,2,3,4,5,6,7,8] 从后往前逐渐累积
        就可以实现转换成累加树
    */
    let sum = 0;//累计的值
    /**
     * 
     * @param {TreeNode} node 
     * @returns {void} 无返回值
     */
    const traversal = (node) => {
        if(node === null) return;
        traversal(node.right);//右
        //中
        sum += node.val;
        node.val = sum;
        //左
        traversal(node.left);

    }
    traversal(root);
    return root;
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 * 538. 把二叉搜索树转换为累加树 (双指针pre和cur)
 */
var convertBST = function(root) {
    /*
        中序遍历, 但使用的是"右中左"
        [0,1,2,3,4,5,6,7,8] 从后往前逐渐累积
        就可以实现转换成累加树
    */
   let pre = null;
    /**
     * 
     * @param {TreeNode} cur 
     * @returns {void} 无返回值
     */
   const traversal = (cur) => {
    if(cur === null) return;
    traversal(cur.right);//右
    //中
    if(pre !== null) {
        cur.val += pre.val;
    }
    pre = cur;
    //左
    traversal(cur.left);
   }
   traversal(root);
   return root;
};

const convertBST_head_1 = build_tree([4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]);
const convertBST_result = convertBST(convertBST_head_1);