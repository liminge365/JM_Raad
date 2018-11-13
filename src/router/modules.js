import { account, page, dataAnalysis, OneDataBar, login, forgetpwd, articleDetails,protocol,privacy} from './HomePage'
import { Reading, setnavBar, readPersnal, readDtail } from './reading'
import { Setup, Contact, About, ShareLogo, screenshot,Festival } from './setup'
import { Account, writeaccount, setaccount, accountGive,accountUpdate} from './account'
import { Order, OrderTaskDtail, orderDtail, replaceTax, deleBill, endBill, pullBill, waitEndBill, settlementBill, flowDtails} from './order'
export default [
    page,
    dataAnalysis,
    OneDataBar,
    account,
    protocol,
    privacy,

    Reading,
    setnavBar, 
    readPersnal, 
    readDtail,
    
    Account, 
    writeaccount,
    setaccount,
    accountGive,
    accountUpdate,

    Order,
    OrderTaskDtail,
    orderDtail,
    replaceTax,
    deleBill, 
    endBill, 
    pullBill, 
    waitEndBill,
    settlementBill,
    flowDtails,
    
    Setup,
    Contact,
    About,
    ShareLogo,
    screenshot,
    Festival,

    login,
    forgetpwd,
    articleDetails
]