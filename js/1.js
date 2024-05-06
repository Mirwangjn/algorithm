// const set = new Set([1, 2, 3, 4]);
// console.log(set);

// set.add("woshi");
// set.add("xiaoxiaowang");
// set.add({o: 1, p: 2});

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 
 * 两个数组的交集
 */
var intersection = function(nums1, nums2) {
    const set = new Set(nums1);
    const result_set = new Set();
    //填充元素
    // for (let i = 0; i < nums1.length; i++) {
    //     set.add(nums1[i]);
    // }
    for (let j = 0; j < nums2.length; j++) {
        if(set.has(nums2[j])) {
            //set自带去重
            result_set.add(nums2[j]);
        }
    }
    return result_set;
};

// const result1 = intersection([1,2,2,1], [2, 2]);
// console.log(Array.from(result1));
// const result2 = intersection([1, 2, 3, 3], [2, 3, 4, 5, 5]);
// console.log(result2);


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 
 * 两数相加
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const result = target - nums[i];
        for (const [key, value] of map) {
            // console.log(key, value);
            if(key === result) {
                return [value, i];
            }
        }
        map.set(nums[i], i);
    }
    return [];
};

// const result1 = twoSum([2,7,11,15], 9);
// console.log(result1);
// const result2 = twoSum([3,2,4], 6);
// console.log(result2);
// const result3 = twoSum([3,3], 6);
// console.log(result3);

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 * 
 * 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
 * nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
 * 参考:力扣编号: 454
 */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    /*
        1. 为什么选择使用集合?
            (1). 查找一个元素是否被发现, 例如在nums3[x] + nums4[y]需要与nums1[i] + nums2[j]进行运行, 所以需要存储与nums1[i] + nums2[j]的值
        2. 为什么使用"map"; 而不是"set"
            (1).  除了需要存储nums1[i] + nums2[j]还是需要"记录它的值出现的次数". 如果只记录值的话, 不管怎么样都只有1次
    */
    const map = new Map();
    let count = 0;
    for(let i = 0; i < nums1.length; i++) {
        for(let j = 0; j < nums2.length; j++) {
            let num_two = nums1[i] + nums2[j];
            /*
                1. 记录nums1[i] + nums2[j]的值, 以及出现的次数
                2. has方法返回Boolean值
            */
            if(map.has(num_two)) {
                // 值存在
                map.set(num_two, map.get(num_two) + 1);
            } else {
                // 值不存在
                map.set(num_two, 1);
            }
        }
    }
    /*
        nums3[x] + nums4[y]的值与map存储的值进行匹配
        0 - (nums3[x] + nums4[y]) 如果等于map中的某个目标值, 即它就是目标结果

    */ 
   for(let x = 0; x < nums3.length; x++) {
        for(let y = 0; y < nums4. length; y++) {
            const target = nums3[x] + nums4[y];
            const result = map.get(0 - target);
            count += (result || 0);
        }
   } 
   return count;
};

// const result1 = fourSumCount([1,2], [-2,-1], [-1,2], [0,2]);
// console.log(result1);
// const result2 = fourSumCount([0], [0], [0], [0]);
// console.log(result2);

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * 三数之和
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
 * 你返回所有和为 0 且不重复的三元组。
    注意：答案中不可以包含重复的三元组。
 * 编号: 15
 */
var threeSum = function(nums) {
    const result_arr = [];
    //先对数组进行排序
    nums.sort((a, b) => {
        return a - b;
    });
    //排序之后如果第一个都是正数, 则肯定找不到返回所有和为 0 且不重复的三元组
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] > 0) {
            return result_arr;
        }
        let left = i + 1;
        let right = nums.length - 1;
        if(i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        //因为条件是三个数的下标是不能一样的, 所以left != right
        while(left < right) {
            const target = nums[i] + nums[left] + nums[right];
            if(target > 0) {
                // 因为nums是经过排序了的(从小到大), 所以应该right--
                right--;
            } else if(target < 0) {
                //小于时
                left++;
            } else {
                //等于时
                result_arr.push([nums[i], nums[left], nums[right]]);
                //去重
                while(left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while(left < right && nums[right] === nums[right - 1])
                {
                    right--;
                }
                right--;
                left++;
            }
        }
    }
    return result_arr;
};

// const result1 = threeSum([-1,0,1,2,-1,-4]);
// console.log(result1);
// const result2 = threeSum([-4,-1,-1,0,1,2]);
// console.log(result2);
// const result3 = threeSum([-2,0,3,-1,4,0,3,4,1,1,1,-3,-5,4,0]);
// console.log(result3);

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 * 
 * 四数之和
 * 编号: 18
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。
 * 请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
 * 0 <= a, b, c, d < n
    a、b、c 和 d 互不相同
    nums[a] + nums[b] + nums[c] + nums[d] == target 
 */
var fourSum = function(nums, target) {
    let result_arr = [];
    nums.sort((a, b) => {
        return a - b;
    })

    for(let k = 0 ; k < nums.length; k++) {
        /*
            剪枝
            因为是有target的, 所以不能直接使用nums[k] > 0 直接break什么的; 而且也不能 nums[k] > target; break
            例如: nums = [-4,-1,0,0]; target = -5 ; nums[0] > target这样就跳过了结果集
            在保证都是正数的情况下使用nums[k] > target
        */
       if(nums[k] > 0 && target > 0 && nums[k] > target) break;
       /*
        给k去重
        [-1, -1, 0, 1, 1, 1]; target = 0;
       */
       if(k > 0 && nums[k] === nums[k - 1]) continue;

       for(let i = k + 1; i < nums.length; i++) {
            //给i和k这个整体去重, 因为数组是升序的, 所以升序之后的值一定是 >= 之前的值
            const overall = nums[i] + nums[k];
            /**
             * 剪枝
             * [-100, -4, -1, 0 ,0] target = -105 如果只有overall > target还不够
             */
            if(overall > target && nums[i] > 0 && nums[k] > 0) return result_arr;
            /*
                给i去重, 要i的起始位置为标准来看待
                如果设立条件为 k > 0代替 i > k + 1的话, 则代表着k的第一回合, i都不执行nums[i] === nums[i - 1]这个条件
                例: [-1, -1, -1, -1, 0, 1, 1, 1] --  target = -2
                当k = 0; i = 2; 这时就会重复收获结果集[-1, -1, -1, 1]
            */ 
            if(i > k + 1 && nums[i] === nums[i - 1]) continue;

            let left = i + 1;
            let right = nums.length - 1;
            while(left < right) {
                const four_sum = overall + nums[left] + nums[right];
                if(four_sum > target) {
                    right--;
                } else if(four_sum < target) {
                    left++;
                } else {
                    result_arr.push([nums[i], nums[k], nums[left], nums[right]]);
                    //给left和right去重
                    while(left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }
                    while(left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    left++;
                    right--;
                }
            }
       }

    }
    return result_arr;
};

// const result1 = fourSum([-2, -1, 0, 0, 1, 2], 0);
// console.log(result1);
// const result2 = fourSum([2,2,2,2,2], 8);
// console.log(result2);
// const result3 = fourSum([-4,-1,0,0], -5);
// console.log(result3);
// const result4 = fourSum([-1, -1, -1, 0, 1, 1, 1], -3);
// console.log(result4);

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0;
    let right = s.length - 1;
    for(let i = 0; i < s.length / 2; i++) {
        let tmp = s[left];
        s[left] = s[right];
        s[right] = tmp;
        left++;
        right--;
    }
    // return s;
};
// let tmp = "wangjianian";
// const result1 = reverseString(tmp);
// console.log(tmp);

/**
 * @param {string} needle
 * @return {number[]}
 */
const get_next = (needle) => {
    const result_arr = [];
    result_arr[0] = 0;
    let j = 0;
    for(let i = 1; i < needle.length; i++) {
        while(j > 0 && needle[i] !== needle[j]) {
            j = result_arr[j - 1];
        }
        if(needle[i] === needle[j]) {
            j++;
        }
        result_arr.push(j);
    }
    return result_arr;
}

// const result1 = get_next("adcadde");
// console.log(result1);
// const result3 = get_next("aabaaf");
// console.log(result3);
// console.log(get_next("abababab"));

/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    /**
        kmp算法
        一个重复的字符串的长度 - 最长相等前后缀 = 可以不断重复的部分
        例如: abcabcabc  ===> s
              |    | ===> 前缀 t
                |     |  ===> 后缀 f
        1. t = f因为是相等的前后缀
        2. t[0] = f[0]; t[1] = f[1]; s123 = f123; s123 = t123; f123 = t123;

        最终如果s的长度整除"s字符串的最长相等前后缀剩余的部分"等于0, 那么这个串就是重复的字符串
     */
     const next = get_next(s);
     const length_s = s.length;
     //求得s字符串的最长相等前后缀剩余的部分
     const next_s = length_s - next[length_s - 1];
     if(next[length_s - 1] === 0) {
        return false;
     }
     if(length_s % next_s === 0) 
     {
        return true;
     } else {
        return false;
     }
};

// const result1 = repeatedSubstringPattern("abaababaab");
// console.log(result1);

//构造函数
var MyQueue = function() {
    //进栈
    this.stackin = [];
    //出栈
    this.stackout = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stackin.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    const stackin = this.stackin;
    if(this.stackout.length !== 0) return this.stackout.pop();

    //将进栈的元素弹出到出栈中
    while(stackin.length) {
        //弹出stackin的最后一个元素并放到stackout中
        this.stackout.push(stackin.pop());//这是数组的pop和push方法
    }
    return this.stackout.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    const x = this.pop();
    this.stackout.push(x);
    return x;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.stackin.length && !this.stackout.length;
};

// const result = new MyQueue();
// result.push(1);
// result.push(2);
// result.push(3);
// let result1 = result.pop();

// result1 = result.pop();

// result1 = result.peek();

// let result2 = result.empty();

/**
 * @param {string} s
 * @return {boolean}
 * 
 * 有效的括号
 * 编号: 20
 */
var isValid = function(s) {
    //剪枝, 若长度为奇数肯定不是有效括号
    if(s.length % 2 !== 0) return false;
    /**
        不匹配的三种情况
        1. 缺胳膊少腿 ([{}] 
        2. 匹配错误 (}
        3. 没有匹配上或者多了()))

        使用栈的方式实现, 当匹配到一个"("时将")"放在栈中, 等匹配到一定程度时, 就开始消消乐
     */
    //  栈
    const stack = [];
    for(let i = 0; i < s.length; i++) {
        /*
            若为'(', '{', '['则加入进栈
        */
        if(s[i] === '(') {
            stack.push(')');
        } else if(s[i] === '{') {
            stack.push('}');
        } else if(s[i] === '[') {
            stack.push(']');
        } else if(stack.length === 0 || s[i] !== stack[stack.length - 1]) {
            /*
                1. 栈顶元素与当前元素不同时
                2. 栈为空
                3. 栈为空的条件在前, 因为当栈为空时无法访问stack[stack.length - 1]个元素
            */
            return false;
        } else {
            //匹配成功的情况下, 将栈顶元素弹出, 然后进入下一轮
            stack.pop();//弹出元素
        }
    }
    return stack.length === 0 ? true : false;
};

// const result = isValid("()[({})]");
// console.log(result);
// const result1 = isValid("((){}[]");
// console.log(result1);
// const result2 = isValid("(}");
// console.log(result2);
// const result3 = isValid("()))");
// console.log(result3);

const remove = (s) => {

}

/**
 * @param {string} s
 * @return {string}
 * 
 * 给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。
 * 在 S 上反复执行重复项删除操作，直到无法继续删除。
 * 例如: "abbaca" ===> ca
 */
var removeDuplicates = function(s) {
    let stack = [];
    for(let i = 0; i < s.length; i++) {
        if(stack.length === 0 || s[i] !== stack[stack.length - 1]) {
            stack.push(s[i]);
        } else {
            stack.pop();
        }
    }
    return stack.join("");
};

// const result1 = removeDuplicates("abbaca");

// const result2 = removeDuplicates("aaaccc");

/**
 * @param {string[]} tokens
 * @return {number}
 *  逆波兰表达式求值
 * 编号: 150
 */
var evalRPN = function(tokens) {
    /*
        使用栈的方式实现, 如果是数字则存到栈中, 为符号的话则从栈顶中取两个元素(这道题运算都是两个数两个数的运算)
        例如: 有(1 + 2) * (3 * 4), 而没有(1 + 2 + 3) * (2 + 3 + 4)
    */
   const stack = [];
   for(let i = 0; i < tokens.length; i++) {
    if(tokens[i] === '+' || tokens[i] === '-' || tokens[i] === '*' || tokens[i] === '/') {
        //从栈顶取两元素
        const ele1 = parseInt(stack.pop());
        const ele2 = parseInt(stack.pop());
        if(tokens[i] === '+') {
            stack.push(ele2 + ele1);
        } else if(tokens[i] === '-') {
            stack.push(ele2 - ele1);
        } else if(tokens[i] === '*') {
            stack.push(ele2 * ele1);
        } else if(tokens[i] === '/') {
            stack.push(ele2 / ele1);
        }
    } else {
        //是数字则进栈
        stack.push(parseInt(tokens[i]));
    }
   }
   //最终token只会有一个元素也就是结果
   return Math.floor(stack[0]);
};

// const result1 = evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]);

// const result2 = evalRPN(["2","1","+","3","*"]);

/*
    弹出顶部元素, 但需要注意这个方法的作用不是什么元素都弹出
    而是当队列出口和val相等时, 才去做弹出操作
    例如: [1, 3], 当3这个元素push进来时, 直接把前面比自己小的元素全部弹出
    注:是全部弹出k = 3; 队列[5, -1, -3] 将5弹出, 3加进来===> [-1, -3, 3]这样就把前面的元素弹出变为[3]
*/
Array.prototype.pop_front = function(val) {
    //如果队列出口的元素与val相同就弹出队列第一个元素
    if(this.length !== 0 && val === this[0]) {
        this.shift();
    }
}
//插入元素以及弹出比当前元素小的元素, 即push时要经历弹出
Array.prototype.push_back = function(val) {
    while(this.length !== 0 && val > this[this.length - 1]) {
        this.pop();
    }
    this.push(val);
}
//返回一直维护在队列顶部的最大值
Array.prototype.result_front = function() {

    return this[0];
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 *   滑动窗口最大值
 * 编号: 239
 */
var maxSlidingWindow = function(nums, k) {
    /**
        使用单调队列实现滑动窗口
        这个自定义的单调队列只维护队列有可能成为出口的最大元素
        思路: 滑动窗口的过程很像队列的弹出和推入, 队列的k个元素, 为移动一次就执行一次弹出和推入
    */
    const queue = [];
    //结果集
    const result_arr = [];
    //i指向需要遍历的元素的位置; j指向需要弹出的元素下标位置
    let i, j = 0;
    for(i = 0; i < k; i++) {
        queue.push_back(nums[i]);
    }
    //收获一次结果集
    result_arr.push(queue.result_front());
    for(; i < nums.length; i++) {
        //弹出队列出口元素, 如果条件符合的的话
        queue.pop_front(nums[j]);
        //推入
        queue.push_back(nums[i]);
        //再次收割结果集
        result_arr.push(queue.result_front());
        j++;
    }
    return result_arr;
    
};

// const result1 = maxSlidingWindow([1, 3, -1, -3, 5, 3, 2, 1], 3);

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * 前 K 个高频元素
 * 编号: 347
 */
var topKFrequent = function(nums, k) {
    const map = new Map();
    //记录出现的频率
    for(let i = 0; i < nums.length; i++) {
        if(map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1);
        } else {
            map.set(nums[i], 1);
        }
    }
    
    const transfrom = Array.from(map);
    const result = [];
    transfrom.sort((a, b) => {
        return b[1] - a[1];
    })
    for(let i = 0; i < k; i++) {
        result[i] = transfrom[i][0];
    }
    return result;
};

// const result1 = topKFrequent([1,1,1,2,2,3], 2);

// function listNode(val, next) {
//     this.val = (val === undefined ? 0 : val);
//     this.next = (next === undefined ? null : next);
// }



//二叉树构造函数(链式结构)
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}


/**
 * @param {TreeNode} root
 * @param {number[]} result_arr
 * @return {number[]}
 * 
 * 二叉树前序遍历递归实现
 */
var search = function(root, result_arr) {
    /**
        二叉树的三种遍历方式(栈实现)
        1. 前序遍历 ===> 中左右
        2. 中序遍历 ===> 左中右
        3. 后序遍历 ===> 左右中
        前中后序指的是 "中"的位置
    */
   if(root === null) {
    return;
   }
    result_arr.push(root.val);
    search(root.left, result_arr);
    search(root.right, result_arr);
};
/**
 * 
 * @param {TreeNode} root 
 */
var preorderTraversal = function(root) {
    /**
        二叉树的三种遍历方式(栈实现)
        1. 前序遍历 ===> 中左右
        2. 中序遍历 ===> 左中右
        3. 后序遍历 ===> 左右中
        前中后序指的是 "中"的位置
    */
    const result_arr = [];
    search(root);
    return result_arr;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 二叉树中序遍历递归实现
 */
var inorderTraversal = function(root) {
    const result_arr = [];
    /**
     * 
     * @param {TreeNode} root 
     */
    function search_middle(root) {
        if(root === null) return;
        search_middle(root.left);
        result_arr.push(root.val);
        search_middle(root.right);
    }
    search_middle(root);
    return result_arr;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 二叉树后序遍历递归实现
 */
var postorderTraversal = function(root) {
    const result_arr = [];
    /**
     * 
     * @param {TreeNode} root 
     */
    function search_behind(root) {
        if(root === null) return;
        search_behind(root.left);
        search_behind(root.right);
        result_arr.push(root.val);
    }
    search_behind(root);
    return result_arr;
};

/**
 * 
 * @param {TreeNode} root 
 * @return {number[]}
 * 使用迭代法来实现二叉树前序遍历
 */
// const suborderTraversal = (root) => {
//     if(root === null) return [];
//     //递归底层实现实际上就是使用栈
//     const result_arr = [];
//     const stack = [];
//     //将根元素入栈
//     stack.push(root);
//     //下列循环不会将null放进栈中
//     while(stack.length !== 0) {
//         //前序 ===> 中左右   首先收获一个结果
//         const node = stack.pop();
//         result_arr.push(node.val);
//         //因为是栈结构先进后出, 所以不能先将左节点放入栈中, 而是先将右节点放入, 这样就满足先进后厨
//         if(node.right !== null) {
//             stack.push(node.right);
//         }
//         if(node.left !== null) {
//             stack.push(node.left);
//         }
//     }   
//     return result_arr;
// }
const suborderTraversal = (root) => {
    const result_arr = [];
    const stack = [];
    //将根元素入栈
    stack.push(root);
    //下列循环会将null放在栈中
    while(stack.length !== 0) {
        //将栈顶的元素弹出
        const node = stack.pop();
        if(node !== null) {
            result_arr.push(node.val);
        } else {
            continue;
        }
        stack.push(node.right);
        stack.push(node.left);
    }
    return result_arr;
}

//最底层节点
const test1 = new TreeNode(2, null, null);
const test2 = new TreeNode(4, null, null);
//中层节点
const test3 = new TreeNode(3, test1, test2);
const test4 = new TreeNode(9, null, null);
//头节点
const head = new TreeNode(6, test3, test4);

// const result1 = preorderTraversal(head);

// const result1 = inorderTraversal(head);

// const result1 = postorderTraversal(head);

const result1 = suborderTraversal(head);

