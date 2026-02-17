const express = require('express');
const { createOrder, getOrders, getAllOrders } = require('../controllers/orderController');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getOrders);
router.get('/admin', authenticateToken, isAdmin, getAllOrders);

module.exports = router;
