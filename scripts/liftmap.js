
var previousUrl = location.href;
/**
 * Sets up a mutation observer to detect when the url changes to https://liftmap.com/
 * and calls callChanges when this happens
 */
var navigationChangeListener = function () {
    // Add a mutation observer for detecting url changes and call changes
    // There might be other ways to do this but I'm more familiar with the concepts of observers
    var observer = new MutationObserver(function (mutations) {
         if (location.href !== previousUrl && location.href === 'https://liftmap.com/') {
            callChanges();
        }
        previousUrl = location.href;
    });

    // monitor all the descendants and detect when child elements are added
    const config = { subtree: true, childList: true };
    observer.observe(document, config);
}

/**
 * Updates the header of the page with a new text and adds a list of propositions under it
 */
var updateHeader = function () {

    var newHeader = document.querySelector('h1.lm-hero__header');
    if (newHeader === null) {
        return;
    }
    newHeader.innerText = 'We are the best experimentation agency in the world';

    // add propositions list under the header
    var valuePropositionList = document.createElement('ul');
    valuePropositionList.classList.add('value-proposition-list');
    const propositions = ['Increase conversion rates across your website', 'Iterative site redesign', 'Improve ROAS efficiency', 'Standing or scaling an experimentation program', 'Advanced customer research'];
    propositions.forEach(function (proposition) {
        var valueProposition = document.createElement('li');
        valueProposition.innerText = proposition;
        valuePropositionList.appendChild(valueProposition);
    })
    newHeader.after(valuePropositionList);
}

/**
 * Changes the event listener of the 'Why Liftmap' button to scroll to the Why Liftmap section when clicked
 */
var changeWhyLiftMap = function () {
    // check if button exists
    var whyLiftMapButton = document.querySelector('div.lm-hero__buttons button.btn-video');
    if (whyLiftMapButton === null) {
        return;
    }
    // clone the previous button to remove old even listener
    let clone = whyLiftMapButton.cloneNode(false);
    while (whyLiftMapButton.firstChild) {
        clone.appendChild(whyLiftMapButton.firstChild);
    }
    whyLiftMapButton.parentNode.appendChild(clone);
    whyLiftMapButton.remove();

    // add new event listener
    whyLiftMapButton = document.querySelector('div.lm-hero__buttons button.btn-video');
    whyLiftMapButton.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('div.lm-why').scrollIntoView({
                behavior: 'smooth'
            });
        });
}

/**
 * Calls both updateHeader and changeWhyLiftMap functions to update the page content
 */
var callChanges = function () {
    updateHeader();
    changeWhyLiftMap();
}
callChanges();
navigationChangeListener();
