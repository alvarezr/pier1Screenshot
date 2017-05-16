var urls = 
[
    'http://www.pier1.com',
    'http://www.pier1.com/on/demandware.store/Sites-pier1_us-Site/default/Search-Show?q=blue'
];
 function Config(url){
     this.browsersList =  {
        browsers : 
        [
            {
                "os": "ios",
                "os_version": "8.3",
                "browser": "Mobile Safari",
                "device": "iPhone 6"
            },
            {
                "os": "Windows",
                "os_version": "8.1",
                "browser": "chrome",
                "browser_version": "50.0"
            },
            {
                "os": "Windows",
                "os_version": "8.1",
                "browser": "ie",
                "browser_version": "11.0"
            },
            {
                "os": "OS X",
                "os_version": "El Capitan",
                "browser": "chrome",
                "browser_version": "50.0"
            }
        ],
        url : url
    };

 }

module.exports.getList = function(){
       return buildClients(); 
}

function buildClients(){
   let list;
   list = urls.map(function(index){

       let b = new Config(index);
       return b.browsersList;
    });
  
  return list;
}