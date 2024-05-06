//N叉树结构
function Node(val, children) {
    this.val = (val === null ? 0 : val);
    this.children = (children === null ? [] : children);
}

/**
 * @param {Node|null} root
 * @return {number[][]}
 * 429. N 叉树的层序遍历
 */
var levelOrder = function(root) {
    //N叉树的children是一个数组
    //记录当前层的节点个数, 下一层的节点个数为当前层元素都弹出之后的队列长度
    let cur_size = 0;
    const result_arr = [];
    const queue = [];
    //根节点入队列
    queue.push(root);
    //队列等于0时结束
    while(queue.length !== 0) {
        const result_tmp = [];
        cur_size = queue.length;
        while(cur_size--) {
            //弹出队列头元素
            const node = queue.shift();
            result_tmp.push(node.val);
            //将子节点加入到栈中
            node.children.forEach((ele) => {
                queue.push(ele);
            });
        }
        result_arr.push(result_tmp);
    }
    return result_arr; 
};

//最底层节点
const bottom_node1 = new Node(5, []);
const bottom_node2 = new Node(6, []);
//中层节点
const middle_node3 = new Node(3, [bottom_node1, bottom_node2]);
const middle_node4 = new Node(2, []);
const middle_node5 = new Node(4, []);
//根节点
const head = new Node(1, [middle_node3, middle_node4, middle_node5]);

const result = levelOrder(head);