// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
const uri = "/api/Products"; //the api as a global variable
// alert("API " + uri);
let allproducts = null; //holds the data in a global



function validateForm() {
 
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      
        document.getElementById('add-name').value= 'Please Enter Valid Credentails';
        return false;
       
    }
    else {
       
        addItem();

    }
}

//Loads up the <p id="counter"> </p> with a count of the staff, data come from the LoadTable Function where this is called
function getCount(data) {
    // alert("getcount " + data);

    const theCount = $("#counter"); //bind TheCount to the counter

    if (data) { //if any data exists
        // alert("We have data " + data);
        theCount.text(`There are ${data} Products`);
    } else {
        theCount.text("There are no Products");
        alert("No data");
    }
}

//this function reloads the table of staff after any changes
function LoadTable() {
    $.ajax({
        type: "GET", //use the GET controller
        url: uri, //the uri from the global
        cache: false, //don't cache the data in browser reloads, get a fresh copy
        success: function (data) { //if the request succeeds ....
            const tBody = $("#allproducts"); //for the tbody bind with allstaff <tbody id = "allproducts" ></tbody >
            allproducts = data; //pass in all the data to the global allstaff use it in Edit
            $(tBody).empty(); //empty out old data

            getCount(data.length); //count for the counter function

            //a foreach through the rows creating table data
            $.each(data,
                function (key, item) {
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.name)) //inserts content in the tags
                        .append($("<td></td>").text(item.price))
                        .append($("<td></td>").text(item.description))
                        
                        .append($("<td></td>")
                            .append($("<a href='#editproductsModal' class='edit' data-toggle='modal'>Edit</a>")
                                .on("click",
                                    function () {
                                        //alert(item.id);
                                        editItem(item.id);
                                    }) //in the empty cell append in an edititem button
                            )
                        )
                        .append(
                            $("<td></td>").append(
                                $("<a href='#deleteItem' class='delete'> <i class='material - icons'>&#xE15C;</i><span>Delete</span></a>").on("click",
                                    function () {
                                        deleteItem(item.id);
                                    }) //in an empty cell add in a deleteitem button
                            )
                        );
                    tr.appendTo(tBody); //add all the rows to the tbody
                });
        }
    });
}

//Add an person to the database
function addItem() {
    const item = {
        name: $("#add-name").val(),
        price: $("#add-price").val(),
        description: $("#add-description").val(),
       
    };

    $.ajax({
        type: "POST",
        url: uri,
        data: JSON.stringify(item),
        contentType: "application/json; charset=utf-8",
        //if it is successful
        success: function (result) {
            alert("Product Added");
            LoadTable();
            $("#add-name").val(""); //clear entry boxes
            $("#add-price").val("");
            $("#add-description").val("");
            
            //alert("Staff added successfully");
            //console.log(result)
        },
        //if there is an error
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("Something went wrong!");
            alert("Failed.");
        }
    });
}

//Delete a person from the database
function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id, //add the ID to the end of the URI
        type: "DELETE", //this calls the DELETE in the API controller
        success: function (result) {
            LoadTable();
        }
    });
}

//click event for edit button to load details into form. Go through each entry held in  allproducts and add in the one that matches the id from the click
function editItem(id) {
    
    $.each(allproducts,
        function (key, item) {
          //  alert(item.id); 
            if (item.id === id) { //where the ID == the one on the click
                $("#edit-id").val(item.id);
                $("#edit-name").val(item.name); //add it to the form field
                
                $("#edit-price").val(item.price);
                $("#edit-description").val(item.description);

                
                
            }
        });
}

$(".my-form").on("submit", //saving the edit to the db
    function () {
        const item = { //pass all the data on the form to a variable called item use laterto send to server
           name: $("#edit-name").val(),
            price: $("#edit-price").val(),
            description: $("#edit-description").val(),
           
            id: parseInt($("#edit-id").val())
        };

        //alert(`Saving ... ${item.id} ${item.reg}`);
        $.ajax({
            type: "PUT", //send it to the PUT controller
            url: uri + "/" + $("#edit-id").val(), //add the row id to the uri
            data: JSON.stringify(item), //take the item data and pass it to the serever data is moved to server
            contentType: "application/json",
            success: function (result) {
                alert("Successfully updated ");
                LoadTable(); //load the table afresh
            },
            //if Failed
            error: function (jqXHR, textStatus) {
                alert("Failed to edit");
            }
        });
        return false;
    });
$(document).ready(function () {
    // Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Filter table rows based on searched term
    $("#search").on("keyup", function () {
        var term = $(this).val().toLowerCase();
        $("table tbody tr").each(function () {
            $row = $(this);
            var reg = $row.find("td:nth-child(1)").text().toLowerCase();
            console.log(name);
            if (name.search(term) < 0) {
                $row.hide();
            } else {
                $row.show();
            }
        });
    });
});