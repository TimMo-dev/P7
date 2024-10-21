(function(window, document) {
    
    
    window.onload = init;
    
    function init(){
        const form = document.getElementById('codeForm');
        const submitButton = document.getElementById('submitButton');
        
        submitButton.addEventListener('click', function () {
          form.submit(); 
        });
      
    }
  
  })(window, document);