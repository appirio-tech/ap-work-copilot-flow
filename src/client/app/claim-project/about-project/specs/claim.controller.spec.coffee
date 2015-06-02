# 'use strict'

# controller = null
# scope = null
# setNextStateSpy = null
# navServClaimState = null

# describe 'SubmitClaimController', ->
#   beforeEach inject ($rootScope, $controller, NavService) ->
#     navServ = NavService
#     navServClaimState = navServ.findState 'Claim'
#     setNextStateSpy = sinon.spy navServ, 'setNextState'
#     scope = $rootScope.$new()
#     scope.ClaimForm =
#       $valid: true
#     controller = $controller 'SubmitClaimController', $scope: scope
#     $rootScope.$apply()

#   describe 'Claim controller', ->
#     it 'should be created successfully', ->
#       expect(controller).to.be.defined

#     describe 'after activate', ->
#       it 'should have title of Claim', ->
#        expect(controller.title).to.equal('Claim')

#     describe 'submit', ->
#       beforeEach ->
#         controller.submit()

#       context 'when Claim form is valid', ->

#         it 'should set "Claim" state on NavService to "visited"', ->
#           expect(navServClaimState.visited).to.equal(true)

#         it 'should call setNextState on NavService', ->
#           expect(setNextStateSpy).to.have.been.called
