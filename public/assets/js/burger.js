$(document).ready(function () {
  //EVENT TO CREATE A NEW BURGER ITEM
  //creating an on submit event for the create form that adds burgers
  $(".create-form").on("submit", (event) => {
    // since the button is in a form it needs a prevent default to keep it from submitting without proper instruction
    event.preventDefault();

    //creating an object that has the information to bring to the controller for the new burger entered by the user
    const burger_name = $("#add-burger-field").val().trim();
    //stop immediately if nothing is entered
    if (!burger_name) {
      return;
    }
    const newBurger = {
      //grabbing the value from the text input
      burger_name: burger_name,
    };

    //using ajax to pass the information from HTML to the controller
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(() => {
      //log to console success message
      console.log("User added a new burger");
      //reload the page to display the new burger in the appropriate card - Ready to Eat/Devoured
      location.reload();
    });
  });

  //EVENT TO DEVOUR A BURGER ITEM
  $(".devour-btn").on("click", (event) => {
    event.preventDefault();
    const burgerToDevour = event.target.getAttribute("data-burger-id");
    const devouredObj = { devoured: true };
    $.ajax("/api/burgers/" + burgerToDevour, {
      type: "PUT",
      data: devouredObj,
    }).then(() => {
      //log to console success message
      console.log("---\nUser updated a burger\n-----");
      //reload the page to display the new burger in the appropriate card - Ready to Eat/Devour
      location.reload();
    });
  });

  //EVENT TO DELETE A BURGER ITEM
  $(".trash-btn").on("click", (event) => {
    event.preventDefault();
    const burgerToTrash = event.target.getAttribute("data-burger-id");

    $.ajax("/api/burgers/" + burgerToTrash, {
      type: "DELETE",
    }).then(() => {
      //log to console success message
      console.log("---\nUser deleted burger", burgerToTrash);
      //reload the page to display the new burger in the appropriate card - Ready to Eat/Devoured
      console.log("--------------I'm about to reload the page--------------");
      location.reload();
    });
  });
});
