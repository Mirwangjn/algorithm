//链表结构
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (val === undefined ? null : next);
}

ListNode.prototype.get = function(index) {
    let count = -1;
    let cur = this;
    while(cur !== null) {
        count++;
        if(index === count) return cur;
        cur = cur.next;
    }
    return null;
}
/**
 * 
 * @param {number[]} nums 
 * @returns {ListNode}
 * 构建链表
 */
function build_list(nums, index = 0) {
    if(index >= nums.length || nums[index] === null) return null;

    const node = new ListNode(nums[index], null);
    node.next = build_list(nums, index + 1);
    return node;
}

const build_list_test1 = build_list([1,2,3,4,5,6]);
const build_list_test2 = build_list([1,2,3,4,5,6, null]);

/**
 * @param {number[]} nums
 * @return {number[]}
 * 977. 有序数组的平方
 */
var sortedSquares = function(nums) {
    /** 
      [-4,-1,0,3,10]在平方且不变序后为[16, 1, 0, 9, 100]
      最大的一定在两边, 使用left和right指针, 若左元素大, 让left++;
      若右元素大, 让right++ , 如果相等随便让谁++
    */
    const result_arr = [];
    let left = 0;
    //k指向末尾的下标
    let right = nums.length - 1;
    //如果数组中只有一个元素[1], 这时如果left < right而不是等于的话, 就错过了这个唯一的结果
    while(left <= right) {
        //一定要确保最大值的平方在两边
        const nums_left = Math.pow(nums[left], 2);
        const nums_right = Math.pow(nums[right], 2);
        if(nums_left > nums_right) {
            result_arr.unshift(nums_left);
            left++;
        } else {
            result_arr.unshift(nums_right);
            right--;
        }
    }
    return result_arr;
};
//测试用例
const sortedSquares_test = sortedSquares([-4,-1,0,3,10]);

const sortedSquares_test_1 = sortedSquares([-5, -4, -3, -2]);



/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 * 移除链表元素
 */
var removeElements = function(head, val) {
    //创建虚拟头节点
    const dummy = new ListNode(0, head);
    /*
        思路:
        1. 创建虚拟头节点, 这样就不用担心头节点是目标节点的情况
        2. 当遇见目标节点为val时, 拿到目标节点的下一个节点
        3. 让当前节点的next = 目标节点的下一个节点
    */
   let cur = dummy;
   while(cur.next !== null) {
        if(cur.next.val === val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
   }

   return dummy.next;
};

//设计链表
var MyLinkedList = function() {
    //记录链表的长度, 因为addAtIndex函数需要在指定位置插入节点
    this.size = 0;
    //记录头节点, 因为addAtHead需要
    this.head = null;
    //记录尾节点, 因为addAtTail需要
    this.tail = null;
};

/** 
 * @param {number} index
 * @return {number}
 * 获取index下标的val值, 没有返回-1
 */
MyLinkedList.prototype.get = function(index) {
    if(index >= this.size || index < 0) return -1;
    //遍历链表
    let cur = this.head;

    while(index--) {
        cur = cur.next;
    }
    return cur.val;
};

/** 
 * @param {number} val
 * @return {void}
 * 加一个头节点
 */
MyLinkedList.prototype.addAtHead = function(val) {
    this.head = new ListNode(val, this.head);
    //当首次添加时, 尾节点尾头节点
    if(this.size === 0) {
        this.tail = this.head;
    }
    this.size++;
};

/** 
 * @param {number} val
 * @return {void}
 * 加个尾节点
 */
MyLinkedList.prototype.addAtTail = function(val) {
    /*
        1. 整个节点为null, 即长度为0是
        2. 链表有长度时
    */
   const node = new ListNode(val, null);
   if(this.size === 0) {
        this.tail = this.head = node;
        this.size++;
        return;
   }
   //有长度时
   this.tail.next = node;
   this.tail = node;
   this.size++;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 * 创建一个值为val的节点, 插入到index下标之前的元素节点
 * 特例1: index 等于链表的长度，那么该节点会被追加到链表的末尾
 * 特例2: index 比长度更大，该节点将 不会插入 到链表中
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    //这里可以不等于this.size, 因为特例1
    if(index > this.size || index < 0) return;//特例2
    //创建虚拟节点
    const dummy = new ListNode(0, this.head);
    const node = new ListNode(val, null);
    let cur = dummy;//cur.next等于index下标的位置
    let list_count = index;
    while(list_count--) {
        cur = cur.next;
    }
    //特例1
    if(index === this.size) {
        //这时cur的位置等于最后一个节点的位置
        cur.next = node;
        //尾节点更新在这
        this.tail = cur.next;
    } else {
        /*
            index在特定大小之内
            1. 将index位置的值保存起来
            2. 插入节点
            3. 连接节点
        */
        const tmp = cur.next;
        cur.next = node;
        cur.next.next = tmp;
    }
    //更新信息, 尾节点只有在index === this.size才需要更新
    this.head = dummy.next;
    this.size++;
    
};

/** 
 * @param {number} index
 * @return {void}
 * 此函数相当于"移除链表元素"那道题目
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    //如果下标无效或越界则直接返回
    if(index >= this.size || index < 0) return;
    //创建虚拟节点
    const dummy = new ListNode(0, this.head);
    let cur = dummy;
    //判断尾节点是否是删除目标
    let certain_tail = index;
    //删除节点
    while(certain_tail--) {
        cur = cur.next;
    }
    cur.next = cur.next.next;
    //更新信息
    this.head = dummy.next;
    //如果删除的元素是尾节点, 那么cur就是新的尾节点
    if(index === this.size - 1) {
        this.tail = cur;
    }
    this.size--;
    
};

const myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2);    // 链表变为 1->2->3
const test122 = myLinkedList.get(1);              // 返回 2
myLinkedList.deleteAtIndex(1);    // 现在，链表变为 1->3
const test123 = myLinkedList.get(1);  

/**
 * 
 * @param {ListNode} head 
 * @returns {ListNode}
 * 206. 反转链表(双指针)
 */
let reverseList = (head) => {
    //双指针思路 一个pre指向cur的前一个节点, 一个cur指向当前遍历的节点
    let pre = null;
    let cur = head;
    let joint;// 因为cur.next在翻转的过程中, next指向了新的节点, 所以joint需要将之前的旧节点保存起来
    while(cur !== null) {
        //1. 拿到cur之后的节点头
        joint = cur.next;
        //2. 翻转节点
        cur.next = pre;
        //3. 让pre指向cur的前一个节点
        pre = cur;
        // 4. cur前进
        cur = joint;
    }
    //最终pre指向翻转后链表的头
    return pre;
}
/**
 * 
 * @param {ListNode} cur
 * @param {ListNode|null} pre 
 * @returns {ListNode}
 * 反转链表(递归)
 */
let reverse = (cur, pre) => {
    //确定终止条件
    if(cur === null) return pre;//当cur为null时, pre就是头节点位置
    //确定单层逻辑
    //1. 保存cur.next
    let tmp = cur.next;
    //2. 翻转
    cur.next = pre;
    return reverse(tmp, cur);

}
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 * 19. 删除链表的倒数第 N 个结点
 */
var removeNthFromEnd = function(head, n) {
    /** 
        思路: 双指针和虚拟头节点, 快指针fast首先走n + 1; 慢指针slow和fast同步移动
        当fast为null时, slow指向删除节点的前一个节点.
        为什么走n + 1步呢? 因为想要删除一个元素, 就应该在它前一个元素的位置进行操作
    */
    const dummy = new ListNode(0 ,head);//虚拟头节点
    let fast = dummy;
    let slow = dummy;
    n++;
    //fast先走(n + 1)步
    while(n-- && fast !== null) {
        fast = fast.next;
    }
    //然后一起走, 走到fast为null
    while(fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    //删除
    slow.next = slow.next.next;
    return dummy.next;
};


const removeNthFromEnd_head_1 = build_list([1,2,3,4,5]);

const removeNthFromEnd_result = removeNthFromEnd(removeNthFromEnd_head_1, 2);

/**
 * @param {ListNode} head
 * @return {ListNode}
 * 142. 环形链表 II
 * 判断链表是否有环
 */
var detectCycle = function(head) {
    //可以使用哈希表, 当元素重复出现时, 直接返回结果
    let cur = head;
    const set = new Set();
    /* 情况1: 有环形, 则cur永远都不会为null; 情况2: 无环形, 会遇见null. 所以可以让cur !== null为循环条件 */
    while(cur !== null) {
        if(set.has(cur)) {
            return cur;
        } else {
            set.add(cur);
            cur = cur.next;
        }
    }
    //无环形的情况
    return null;
};


const test5 = new ListNode(5, null);
const test4 = new ListNode(4, test5);
const test3 = new ListNode(3, test4);
const test2 = new ListNode(2, test3);
const test1 = new ListNode(1, test2);
test5.next = test2;


const detectCycle_result = detectCycle(test1);






