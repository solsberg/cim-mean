describe 'DisplayInstance', ->
  Given -> module('cimApp')
  Given -> @instance = {}

  When -> inject (DisplayInstance) ->
    @displayInstance = new DisplayInstance(@instance)

  describe '.displayStatus', ->
    When -> @displayStatus = @displayInstance.displayStatus()

    context 'instance status is "running"', ->
      Given -> @instance.status = 'running'

      describe 'instance is available', ->
        Given -> @instance.isAvailable = true
        Then -> expect(@displayStatus).toEqual('Running')

      describe 'instance is not available', ->
        Given -> @instance.isAvailable = false
        Then -> expect(@displayStatus).toEqual('Starting')

    describe 'instance status is "invalid"', ->
      Given -> @instance.status = 'invalid'
      Then -> expect(@displayStatus).toEqual('Error')
