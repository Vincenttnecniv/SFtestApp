public with sharing class CreateAccountController {
    @AuraEnabled
    public static Account createAccount(String accountName, String accountIndustry) {
        Account newAccount = new Account(Name = accountName, Industry = accountIndustry);
        try{
           insert newAccount;
        }catch (Exception ex) {
            // If an unexpected error occurs, throw an AuraHandledException
            throw new AuraHandledException(ex.getMessage());
        } 
        return newAccount;
    }
}




