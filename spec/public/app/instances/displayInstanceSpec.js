describe('DisplayInstance', function(){
  var instance = {};
  var displayInstance;
  var displayStatus;

  // beforeEach(module('cimApp'));

  // beforeEach(inject(function(_DisplayInstance_){
  //   DisplayInstance = _DisplayInstance_;
  // }));

  Given(module('cimApp'))

  When(inject(function(DisplayInstance){
    displayInstance = new DisplayInstance(instance);
  }))

  describe('.displayStatus', function(){
      When(function(){
        // displayStatus = new DisplayInstance(instance).displayStatus();
        displayStatus = displayInstance.displayStatus();
      })

    describe('instance status is "running"', function(){
      Given(function(){
        instance.status = 'running';
      })

      describe('instance is available', function(){
        Given(function(){
          instance.isAvailable = true;
        })

        Then(function(){
          expect(displayStatus).toEqual('Running');
        })
      })

      describe('instance is not available', function(){
        Given(function(){
          instance.isAvailable = false;
        })

        Then(function(){
          expect(displayStatus).toEqual('Starting');
        })
      })
    })
  })
  // describe('.displayStatus', function(){
  //   describe('instance status is "running"', function(){
  //     it('is "Running" if instance is available', function(){
  //       var instance = new DisplayInstance({status: 'running', isAvailable: true});
  //       expect(instance.displayStatus()).toEqual('Running');
  //     })

  //     it('is "Starting" if instance is not yest available', function(){
  //       var instance = new DisplayInstance({status: 'running', isAvailable: false});
  //       expect(instance.displayStatus()).toEqual('Starting');
  //     })
  //   })
  // })
})