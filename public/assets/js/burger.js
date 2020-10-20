$(document).ready(function () {
  console.log("----------------This is the JS page----------------");

  //creating an on submit event for the create form that adds burgers
  $(".create-form").on("submit", (event) => {
    console.log("--------------I entered the create form click event--------------");
    // since the button is in a form it needs a prevent default to keep it from submitting without proper instruction
    event.preventDefault();

    //creating an object that has the information to bring to the controller for the new burger entered by the user
    const newBurger = {
      //grabbing the value from the text input
      burger_name: $("#add-burger-field").val().trim(),
      //set devoured = false or 0
      //TODO: Why is this necessary, and it didn't work until I added `default 0` to the schema
      devoured: 0,
      //TODO:
    };

    //using ajax to pass the information from HTML to the controller
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(() => {
      //log to console success message
      console.log("User added a new burger");
      //reload the page to display the new burger in the appropriate card - Ready to Eat/Devoured
      console.log("--------------I'm about to reload the page--------------");
      location.reload();
    });
  });

  $(".devour-btn").on("click", (event) => {
    event.preventDefault();
    const burgerToDevour = event.target.getAttribute("data-burger-name");
    console.log("burgerToDevour", burgerToDevour);
    // const burgerCondition = `burger_name = ${burgerToDevour}`
    const devouredObj = { devoured: true };
    // we're saying
    //  `UPDATE ${table}`; done
    // " SET ";
    // objToSql(objColVals); req.params.id
    // " WHERE ";
    // condition;
    $.ajax("/api/burgers/" + burgerToDevour, {
      type: "PUT",
      data: devouredObj,
    }).then(() => {
      //log to console success message
      console.log("---\nUser updated a burger\n-----");
      //reload the page to display the new burger in the appropriate card - Ready to Eat/Devoured
      console.log("--------------I'm about to reload the page--------------");
      location.reload();
    });
  });
});
