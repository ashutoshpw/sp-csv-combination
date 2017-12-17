const csvFilePath='final.uni_25_35.csv';
const csv=require('csvtojson');
var fs = require('fs');
var Sync = require('sync');
file_array = new Array();
file_array[1] = new Array();
file_array[2] = new Array();
file_array[3] = new Array();
file_array[4] = new Array();

function indexOfArray(val, array) {
  var
    hash = {},
    indexes = {},
    i, j;
  for(i = 0; i < array.length; i++) {
    hash[array[i]] = i;
  }
  return (hash.hasOwnProperty(val)) ? hash[val] : -1;
};

function insertintoarray(i){
    switch(i){
            case 1:
                file_name = "final.uni_25_35.csv";
                col = "abs_logodds";
                break;
            case 2:
                file_name = "final.uni.cos_25_35.csv";
                col  = "abs_logjac";
                break;
            case 3:
                file_name = "final.uni.dice_25_35.csv";
                col  = "abs_logcos";
                break;
            case 4:
                file_name = "final.uni.jac_25_35.csv";
                col  = "abs_logdice";
                break;
            default:
                console.log(i);
    }
    
    csv()
    .fromFile(file_name)
    .on('json',(jsonObj)=>{
        
        o = new Array();
        // combine csv header row and csv line to a json object
        var j = 0;
        for (var key in jsonObj) {
            if(j>0 && j<=2){
                var value = jsonObj[key];
                o.push(value);
            }
            j++;
        }

        //console.log(o);
        file_array[i].push(o.join("|"));
        
    })
    .on('done',(error)=>{
        console.log('end')
    })
}
insertintoarray(1);
insertintoarray(2);
insertintoarray(3);
insertintoarray(4);

function union_arrays (x, y) {
  var obj = {};
  for (var i = x.length-1; i >= 0; -- i)
     obj[x[i]] = x[i];
  for (var i = y.length-1; i >= 0; -- i)
     obj[y[i]] = y[i];
  var res = []
  for (var k in obj) {
    if (obj.hasOwnProperty(k))  // <-- optional
      res.push(obj[k]);
  }
  return res;
}
setTimeout(function(){
   c_array = union_arrays(union_arrays(union_arrays(file_array[1],file_array[2]),file_array[3]),file_array[4]);
   n_array = new Array();
   //console.log(c_array);
   for(i=0;i<c_array.length;i++){
       oo = new Array();
       if(file_array[1].indexOf(c_array[i]) != -1)
           oo[1] = 1;
       else 
           oo[1] = 0;
       
       if(file_array[2].indexOf(c_array[i]) != -1)
           oo[2] = 1;
       else 
           oo[2] = 0;
       
       if(file_array[3].indexOf(c_array[i]) != -1)
           oo[3] = 1;
       else 
           oo[3] = 0;
       
       if(file_array[4].indexOf(c_array[i]) != -1)
           oo[4] = 1;
       else 
           oo[4] = 0;
       //console.log(oo);
        n_array[i] = oo;
   }
   setTimeout(function(){
       final_csv = new Array();
       for(i=0;i<c_array.length;i++){
           t = c_array[i].split("|");
           t.push(n_array[i].join(","));
           final_csv.push(t);
       }
       
       setTimeout(function(){
            console.log(final_csv);
           str_fcsv = final_csv.join("\n");
           fs.writeFile("f.csv", str_fcsv, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
       },5000);
       //console.log(n_array)
   },10000);
   for(i=0;i<=file_array[1].length;i++){
      //console.log(file_array);
       
       
       //console.log(indexOfArray(file_array[1][i], file_array[2]));
   } 
},5000);

