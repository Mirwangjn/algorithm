//二叉树构造函数(链式结构)
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
//N叉树结构
function Node(val, left, right, next) {
    this.val = (val === undefined ? null : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
    this.next = (next === undefined ? null : next);
}

/**
 * 
 * @param {number[]} nums 
 * @param {number} index
 * @returns {TreeNode}
 * 给一个数组创建二叉树
 * 
 * 二叉树线性存储, 左孩子: (2 * i + 1); 右孩子: (2 * i + 2)
 */
const build_tree = (nums, index = 0) => {
    //遇到空节点直接返回null
    if(index >= nums.length || nums[index] === null) return null;

    const node = new TreeNode(nums[index], null, null);//中

    node.left = build_tree(nums, 2 * index + 1);//左
    node.right = build_tree(nums, 2 * index + 2);//右

    return node;
}
//测试用例
const head_1 = build_tree([6, 3, 9, 2, 4, null, null]);
const head_2 = build_tree([6, 3, 9, 6, null, null]);
const head_3 = build_tree([1, 2, 2, 3, 4, 4, 3, 5, 6, null, null, null, null, 6, 5]);

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
 * 
 * @param {TreeNode} left 
 * @param {TreeNode} right 
 */
const compare = (left, right) => {
    /*
        出错或正确的5种形式
        1. 左为null右不为null false
        2. 右为null左不为null false
        3. 左右的数值并不相同 false
        4.左右都为null true
        5. 左右都不为null 继续
    */
   if(left === null && right !== null) return false;
   if(left !== null && right === null) return false;
   if(left === null && right === null) return true;
   if(left.val !== right.val) return false;
   //左右都不为null的情况
    const inside = compare(left.left, right.right);//外侧
    const outside = compare(left.right, right.left);//外侧
    return inside && outside;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 * 101. 对称二叉树
 */
var isSymmetric = function(root) {
    if(root === null) return false;
    /*
        此题只可以使用后序遍历(左右中)
        比较根节点的左右子节点
        左子树使用: 左右中
        右子树使用: 右左中
        外侧和外侧比较; 内测和内测比较
    */
    const result = compare(root.left, root.right);
    return result;
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
 */
var mergeTrees = function(root1, root2) {
    //确定终止条件
    if(root1 === null || root2 === null) {
        
    }
};


// const result = hasPathSum(head, 13);

// const result = buildTree([2, 3, 4, 6, 9], [2, 4, 3, 9, 6]);

// const result = buildTree([9,3,15,20,7], [9,15,7,20,3]);

// const result_1 = buildTree([2, 1], [2, 1]);

// const result = constructMaximumBinaryTree([3,2,1,6,0,5])

