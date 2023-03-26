({
    doInit: function(component, event, helper) {
      // Initialize the attributes with default values
      component.set("v.accountName", "");
      component.set("v.accountIndustry", "");
    },
    handleAccountNameChange: function(component, event, helper) {
      // Get the value from the input field and set the accountName attribute
      var accountName = event.getSource().get("v.value");
      console.log("accountName ", accountName);
      component.set("v.accountName", accountName);
    },
    handleAccountIndustryChange: function(component, event, helper) {
      // Get the value from the input field and set the accountIndustry attribute
      var accountIndustry = event.getSource().get("v.value");
      console.log("accountIndustry ", accountIndustry);
      component.set("v.accountIndustry", accountIndustry);
    },
    createAccountJS: function(component, event, helper) {
      // Get the values from the attributes and pass them to the Apex controller
      console.log("createAccount ran");
      var accountName = component.get("v.accountName");
      var accountIndustry = component.get("v.accountIndustry");
      var action = component.get("c.createAccount");
      action.setParams({
        accountName: accountName,
        accountIndustry: accountIndustry
      });
      action.setCallback(this, function(response) {
        var state = response.getState();
        console.log("state= ", response.getState());
        if (state === "SUCCESS") {
          var account = response.getReturnValue();
           var displayMessage = JSON.stringify(account);
          // Handle the successful response from the Apex controller
          console.log(
            "Account created successfully with ID: " + account["Id"]
          );
            alert("Account- "+ account["Name"]+ " Was Added Successfully");
        } else if (state === "ERROR") {
          // Handle the error response from the Apex controller
          alert(
            "Account- ",
            accountName,
            " Was Not Added Successfully Due To This Error: ",
            response.getError()
          );
          console.error(response.getError());
        }
      });
      $A.enqueueAction(action);
    }
  });
  