var currentEvent = 0;

$(function() {
    $("#detailView").hide();
    var today = new Date(); 
    var dd = today.getDate(); 
    var mm = today.getMonth()+1; //January is 0! 
    var yy = today.getFullYear().toString().substr(-2);
    if(dd<10){ dd='0'+dd } 
    if(mm<10){ mm='0'+mm } 
    var today = dd+'/'+mm+'/'+yy; 
    $('input[name="startDate"]').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 5,
        minDate: today,
        locale: {
            "cancelLabel": 'Abbrechen',
            "format": 'DD/MM/YY hh:mm A',
            "separator": " - ",
            "applyLabel": "Ok",
        }
    });
    $('input[name="endDate"]').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 5,
        minDate: today,
        locale: {
            "cancelLabel": 'Abbrechen',
            "format": 'DD/MM/YY hh:mm A',
            "separator": " - ",
            "applyLabel": "Ok",
        }
    });

    $('.list-group-item.event').on('click', function() {
        $("#detailView").show();
        var $this = $(this);    
        $('.active').removeClass('active');
        $this.toggleClass('active');        
    })

  });
  function selectedItem(i) {
    $("#detailTitle").html(events[i].title);
    $("#exeventTitle").val(events[i].title);
    $("#exeventLocation").val(events[i].location);
    $("#exeventStartDateInput").val(events[i].startDate);
    $("#exeventEndDateInput").val(events[i].endDate);
    //console.log("Event Dates: " +events[i].endDate + "  " + events[i].startDate)
    currentEvent = i;
  }

  function showRemoval() {
    $('#removeModal').modal('toggle');
  }

  function removeEvent() {
    var xhr = new XMLHttpRequest();
    var url = "https://komunat.de/events/"+currentEvent;
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Successfully stored values, continue with animation
            location.reload(true);
        }
    };
    xhr.send();
  }

  function saveEvent() {
    events[currentEvent].title = $("#exeventTitle").val();
    events[currentEvent].location = $("#exeventLocation").val();
    events[currentEvent].startDate = $("#exeventStartDateInput").val();
    events[currentEvent].endDate = $("#exeventEndDateInput").val();
    //console.log(events[currentEvent]);
    var xhr = new XMLHttpRequest();
    var url = "https://komunat.de/events";
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Successfully stored values, continue with animation
            location.reload(true);
        }
    };
    var data = JSON.stringify(events);
    xhr.send(data);
  }
 n9
  function newEvent() { 
    var res = {
        title: $("#eventTitle").val(),
        location: $("#eventLocation").val(),
        startDate: $("#startDate").val(),
        endDate: $("#endDate").val()
    }

    var xhr = new XMLHttpRequest();
    var url = "https://komunat.de/events/event";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Successfully stored values, continue with animation
            $('#newEventModal').modal('toggle');
            location.reload(true);
        }
    };
    var data = JSON.stringify(res);
    //console.log(data)
    xhr.send(data);
  }