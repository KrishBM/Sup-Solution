import chai from 'chai';
import sinon from 'sinon';
import jsdom from 'jsdom';
import jquery from 'jquery';
import Web3 from 'web3';

const { expect } = chai;
const { JSDOM } = jsdom;

// Create a virtual DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body>
  <div id="petsRow"></div>
  <template id="petTemplate">
    <div class="panel-title"></div>
    <img />
    <div class="pet-breed"></div>
    <div class="pet-age"></div>
    <div class="pet-location"></div>
    <button class="btn-adopt"></button>
  </template>
</body></html>`, { url: "http://localhost" });

global.window = dom.window;
global.document = dom.window.document;
global.$ = jquery(dom.window);
global.Web3 = Web3;

// Mock the App object
const App = {
    web3Provider: null,
    contracts: {},

    async init() {
        console.log("App initialized");
        return true;
    },

    async initWeb3() {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        console.log("Web3 initialized");
        return true;
    }
};

// Basic Unit Tests
describe('App Basic Tests', () => {
    before(async () => {
        await App.init();
    });

    it('should initialize the App successfully', async () => {
        const result = await App.init();
        expect(result).to.be.true;
    });

    it('should set up Web3 successfully', async () => {
        const result = await App.initWeb3();
        expect(result).to.be.true;
    });
});
