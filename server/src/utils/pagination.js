/**
 * Paginate query results
 * @param {Object} query - Mongoose query
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {Object} - Paginated results with metadata
 */
const paginate = async (query, page = 1, limit = 20) => {
  page = Math.max(1, parseInt(page) || 1);
  limit = Math.min(100, Math.max(1, parseInt(limit) || 20));
  const skip = (page - 1) * limit;

  const [results, total] = await Promise.all([
    query.skip(skip).limit(limit),
    query.model.countDocuments(query.getFilter()),
  ]);

  return {
    data: results,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};

module.exports = { paginate };
