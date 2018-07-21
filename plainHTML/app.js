(function(){
   const angularComponent = document.getElementsByTagName('my-table');
   const reactiveComponent = angularComponent[0].ngElementStrategy.componentRef._component;
   const httpRequest = new XMLHttpRequest();

   httpRequest.onreadystatechange = () => {
     if (httpRequest.readyState === XMLHttpRequest.DONE) {
       if (httpRequest.status === 200) {
         reactiveComponent.next({
           type: "LOAD_CONFIG_SUCCESS",
           payload: {
             config: JSON.parse(httpRequest.response)
           }
         })
       }
     }
   }

   httpRequest.open('GET', 'requests/config.json');
   httpRequest.send();
   // const rc = new reactiveComponent[0].ngElementStrategy.componentRef.componentType();
   // rc.subscribe(value => { console.log(value); })
   // console.log(reactiveComponent[0].ngElementStrategy.componentRef._component.subscribe);
   reactiveComponent.subscribe(value => { console.log(value); })
}())
