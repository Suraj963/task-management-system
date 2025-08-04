module.exports = {
  CHECK_EXISTS:
    'SELECT id, userId, title, description, status, createdAt, updatedAt FROM task WHERE id = ?',

  CREATE: 'INSERT INTO task SET ?',

  UPDATE: 'UPDATE task SET ? WHERE id = ?',

  GET_ALL_DETAILS: (search = '', status = '', userId) => {
    const res = `SELECT id, userId, title, description, status, createdAt, updatedAt FROM task
  WHERE userId = '${userId}'
  ${search ? `AND title LIKE '%${search}%'` : ''}
         ${
  status
    ? `AND status = '${status}'`
    : ''
}
  ORDER BY createdAt DESC`;
    return res;
  },

  GET_BY_ID:
    'SELECT id, userId, title, description, status, createdAt, updatedAt FROM task WHERE id = ?',

  GET_TASK_BY_ID: `SELECT
  p.product_id productId,
  p.name  productName,
  p.price productPrice,
  p.stock productStock,
  p.category_id categoryId,
  p.sub_category_id  subCategoryId
  FROM product p
  WHERE p.is_active = 'Y' AND product_id = ?`,

  DELETE_BY_ID: 'DELETE FROM task WHERE id=?',

  UPDATE_TASK_STATUS: 'UPDATE task SET status = ? WHERE id = ?',

  GET_PENDING_COUNT: 'SELECT COUNT(*) AS pendingCount FROM `task` WHERE status = "Pending" and userId = ?',

  GET_COMPLETED_COUNT: 'SELECT COUNT(*) AS completedCount FROM `task` WHERE status = "Completed" and userId = ?'

};
