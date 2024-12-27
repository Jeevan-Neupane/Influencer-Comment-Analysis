class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST(self, root) -> bool:
        prev = float('-inf')
        def inorder(node):
            nonlocal prev
            if not node:
                return True
            if not (inorder(node.left) and prev < node.val):
                return False
            prev = node.val
            return inorder(node.right)
        return inorder(root)

# Example usage:
# Create a binary tree
#             5
#           /   \
#          1     4
#               / \
#              3   6
root = TreeNode(5)
root.left = TreeNode(9)
root.right = TreeNode(7)
root.right.left = TreeNode(3)
root.right.right = TreeNode(8)

# Check if it's a valid BST
solution = Solution()
print(solution.isValidBST(root))  # This should print False
