/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  '/blocks/hash/:hash': { action: 'block/getBlockByHash' },
  '/blocks/number/:blocknumber': { action: 'block/getBlockByNumber' },
  '/blocks/numbers/:blocknumber/:count': { action: 'block/getXBlocksFromNthFromCChain' },
  '/network': { action: 'network/getNetWorkActivity' },
  '/address/hash/:hash': { action: 'address/getAddressInfoByHash' },
  '/transactions/hash/:hash': { action: 'transaction/getTransactionByHash' },
  '/transactions/:address/:n/:x': { action: 'transaction/getXTransactionsAfterNthFromAddress' },
  '/transactions/:n/:x': { action: 'transaction/getXPendingTransactionsAfterNth' },
  '/transactions/recentxchain': { action: 'transaction/getRecentTransactionsFromXChain' },
  '/transactions/recentpchain': { action: 'transaction/getRecentTransactionsFromPChain' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
