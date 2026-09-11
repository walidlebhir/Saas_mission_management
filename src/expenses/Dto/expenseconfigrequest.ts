import {ExpenseCategory} from "../Entity/enum/ExpenseCategory.js";


export class Expenseconfigrequest{
    mission_id : string ;
    category : ExpenseCategory ;
    dailyLimit : number ;
    perExpenseLimit : number ;
    requiresReceiptAbove : number ;
}