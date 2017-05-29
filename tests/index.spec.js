describe('Error Reporter', function() {

    beforeEach(function() {
        fixture.load('/tests/index.html')
    })

    afterEach(function(){
        fixture.cleanup()
    })

    it('should have title', function() {
        expect(document.getElementsByTagName('h1')[0].innerHTML).toEqual('Pick a button, catch a bug')
    })

    // This test is not working as the test browsers are working differently to how the real browsers are.
    // They are hitting the event listener and console logging the error but the test suite is still detecting that an error was thrown.
    it('should catch error', function() {
        expect(function() {
            document.getElementsByTagName('button')[4].click()
        }).not.toThrow()
    })

    it('should instert error-container', function() {
        insertContainer()
        expect(document.getElementById('error-container')).not.toBeNull()
    })

    it('should insert error on showError', function() {
        document.getElementById('error-container').innerHTML = ''
        showError('ERROR', 'An error happened.')
        expect(document.getElementsByClassName('error').length).toEqual(1)
        var errorElement = document.getElementsByClassName('error')[0]
        expect(errorElement.getElementsByClassName('error-text')[0].innerHTML).toEqual('ERROR')
        expect(errorElement.getElementsByClassName('error-details')[0].innerHTML).toEqual('An error happened.')
    })

    it('should remove error on click', function() {
        document.getElementById('error-container').innerHTML = ''
        showError('ERROR', 'An error happened.')
        expect(document.getElementsByClassName('error').length).toEqual(1)
        var errorElement = document.getElementsByClassName('error')[0]
        errorElement.getElementsByTagName('a')[0].click()
        expect(document.getElementsByClassName('error').length).toEqual(0)
    })

    // Again for this test the error element is inserted correctly inserted as the expections are passing
    // But the test is failing on the error not being caught.
    it('should insert error on Error', function() {
        document.getElementById('error-container').innerHTML = ''
        document.getElementsByTagName('button')[0].click()
        expect(document.getElementsByClassName('error').length).toEqual(1)
        var errorElement = document.getElementsByClassName('error')[0]
        expect(errorElement.getElementsByClassName('error-text')[0].innerHTML).toStartWith('Detected ReferenceError')
    })
})
