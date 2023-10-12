/**
 * @swagger
 * definitions:
 *  historyTransaction:
 *      type: object
 *      properties:
 *          id:
 *              type: number
 *          amount:
 *              type: number
 *          createDate:
 *              type: string
 *          typeTransaction:
 *              type: string
 *  historyTransactionArray:
 *      type: array
 *      items:
 *       $ref: '#definitions/historyTransaction'
 */