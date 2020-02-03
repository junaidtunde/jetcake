const toastr = {};
const $ = window.$;

toastr.showSuccessToast = function(message) {
  $.toast({
    heading: "Successful",
    text: message,
    showHideTransition: "slide",
    icon: "success",
    loaderBg: "#f96868",
    position: "top-right"
  });
};

toastr.showDangerToast = function(message) {
  $.toast({
    heading: "Error",
    text: message,
    showHideTransition: "fade",
    icon: "error",
    loaderBg: "#f2a654",
    position: "top-right"
  });
};

export default toastr;
