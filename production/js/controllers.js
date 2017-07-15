app.controller('myCtrl', function($scope,$http) {
    $scope.prodData = [];
    $scope.searchCode = "";
    $scope.prodtotal = 0;
    $scope.prodsgsttotal=0;
    $scope.prodcgsttotal=0;
    $scope.prodigsttotal=0;

    $scope.handleAmount=0;
    $scope.freightAmount=0;

    $scope.totalincft=0;
    $scope.discountp=0;
    $scope.discounta=0;
    $scope.grantTotal=0;

    $scope.searchEvent = function(event){
        if($scope.supplierData!=null){
            if($scope.searchCode.length==0 && event.which === 13){
                alert("Enter Product code");
            }else{
                if($scope.searchCode.length>=5 && event.which === 13){
                    $scope.getProductBycode();
                }
            }
        }else{
            alert("Choose supplier before adding product");
        }
    }
    
    $scope.onPasteEvent = function(event){
        if($scope.supplierData!=null){
            $scope.searchCode = event.clipboardData.getData('text/plain');
            $scope.getProductBycode();
        }else{
            alert("Choose supplier before adding product");
        }
        
    }

    $scope.removeProduct = function(index){
        $scope.prodData.splice(index,1);
        $scope.prodtotal = 0;
        if($scope.prodData.length==0){
            $scope.handleAmount=0;
            $scope.freightAmount=0;
            $scope.discountp=0;
            $scope.discounta=0;
        }
        $scope.calculateGrantTotal();
    }       
    
    
    $scope.calculateTotal = function(x){
        var prodPriceTemp = x.prodprice;
        if(x.unitData != x.productBaseUnit){
            angular.forEach(x.unitList, function(value, key){
              //console.log("Unitname "+value.unitName+" -- UnitId"+value.unitId);
              if(x.unitData==value.unitId){
                  //console.log(value.unitName+ ': ' + value.unitValue);
                  prodPriceTemp = x.prodprice/value.unitValue;
                  //console.log("1 "+ value.unitName +" = "+ prodPriceTemp +"Rs");
              }
            });
        }
        x.amount = prodPriceTemp*x.qty;
        x.cgstv = ((x.cgstp/100)*(prodPriceTemp*x.qty));
        x.sgstv = ((x.sgstp/100)*(prodPriceTemp*x.qty));
        x.igstv = ((x.igstp/100)*(prodPriceTemp*x.qty));
        x.total = x.amount + x.cgstv + x.sgstv +x.igstv;
        
        $scope.calculateGrantTotal();
        
    }
    
    
    $scope.discountGrandTotal = function(){
         $scope.discounta = ($scope.discountp/100)*$scope.totalincft;
         $scope.grantTotal=$scope.totalincft-$scope.discounta;
    }
    $scope.calculateGrantTotal = function(){
        $scope.prodtotal = 0;
        $scope.prodsgsttotal=0;
        $scope.prodcgsttotal=0;
        $scope.prodigsttotal=0;     
        angular.forEach($scope.prodData, function(value, key){
             $scope.prodtotal = $scope.prodtotal + value.total;
             $scope.prodsgsttotal = $scope.prodsgsttotal + value.sgstv;
             $scope.prodcgsttotal = $scope.prodcgsttotal + value.cgstv;
             $scope.prodigsttotal = $scope.prodigsttotal + value.igstv;
        });
        
        $scope.totalincft= $scope.prodtotal+$scope.freightAmount+$scope.handleAmount;
        $scope.discountp = ($scope.discounta/$scope.totalincft)*100;
                
        $scope.grantTotal=$scope.totalincft-$scope.discounta;

    }
    
    $scope.getProductBycode = function(){
         $http({
             method: 'GET',
             url: 'https://api.myjson.com/bins/143npz',
                //url: 'http://localhost:8080/npadmin/home/product/service/getcode/S/'+$scope.searchCode,
         }).then(function successCallback(response) {
            if(response.data.length==1){
                $scope.loadData(response.data[0]);
                $scope.searchCode ="";
            }else if(response.data.length==0){
                alert("Product not found");
            }else{
                alert("Select required product from drop down");
                //call $scope.loadData(response.data[0]); with correct data as parameter
            }                  
                
          }, function errorCallback(response) {
                alert("Error in Fetching Data from server");
          });
    }
    
    $scope.loadData = function(response){
         response.qty=1;
         response.total=0.00;
         response.amount=0.00;
         response.prodprice='0';
         response.unitData=response.unitSales+'';
         
         response.sgstp=0;
         response.sgstd=0;
         response.sgstv=0;
         
         response.cgstp=0;
         response.cgstd=0;
         response.cgstv=0;
          
         response.igstp=0;
         response.igstd=0;
         response.igstv=0;
         
         //alert(response.priceList[0].priceAmount);
         if(response.priceList.length>=1){
         response.prodprice=response.priceList[0].priceAmount;
         }
         

        
         angular.forEach(response.taxList, function(value, key){
             //console.log(value.taxPercent+ ': ' + value.taxId);
             
             if($scope.supplierData.supplierIS=='N'){
                 if(value.taxId==mcgst){
                     response.cgstp=value.taxPercent;
                     response.cgstd=value.productTaxId;
                 }else if(value.taxId==msgst){
                     response.sgstp=value.taxPercent;
                     response.sgstd=value.productTaxId;
                 }
             }else{
                 if(value.taxId==migst){
                     response.igstp=value.taxPercent;
                     response.igstd=value.productTaxId;
                 } 
             }
        });
         
         $scope.prodData.push(response);
         $scope.calculateTotal(response);
    }

    $scope.selSupplier = '0';
    $scope.supplierData = null;
    $scope.getSupplierById = function(){
        $http({
            method: 'GET',
            url: 'https://api.myjson.com/bins/ueqrj',
                //url: 'http://localhost:8080/npadmin/home/supplier/service/getbyid/'+$scope.selSupplier,
        }).then(function successCallback(response) {
            if(response.data.supplierId!='0'){
                $scope.supplierData = response.data;
            }else{
                $scope.supplierData = null;
            }
            
          }, function errorCallback(response) {
              $scope.supplierData = null;
                alert("Error in Fetching Data from server");
          });
    }
    
});