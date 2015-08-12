# AP Copilot Flow
[![GitHub version](https://badge.fury.io/gh/appirio-tech%2Fap-work-copilot-flow.svg)](http://badge.fury.io/gh/appirio-tech%2Fap-work-copilot-flow)
[![Build Status](https://travis-ci.org/appirio-tech/ap-work-copilot-flow.svg?branch=dev)](https://travis-ci.org/appirio-tech/ap-work-copilot-flow)
[![Coverage Status](https://coveralls.io/repos/appirio-tech/ap-work-copilot-flow/badge.svg?branch=dev&service=github)](https://coveralls.io/github/appirio-tech/ap-work-copilot-flow?branch=dev)
[![Dependency Status](https://www.versioneye.com/user/projects/55cbbee9dfed0a001f000180/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55cbbee9dfed0a001f000180)

## Docs

### Install

- Install the bower component:

```
> bower install --save appirio-tech-copilot
```

- Include the ``main.js`` file in your app.
- Require the ``ap-copilot-flow`` module in the parent app.
- Refer to ``example/scripts/routes.coffee`` in this repo for setting up routing in your app.

### Designs
http://docs.apcopilotservice.apiary.io/#reference/copilot-project-management/individual-calls

### Comitting changes

The bower component served by this repo only includes the dist folder, which is committed. Make sure to ``gulp build`` before adding your files.

## Development
```
alias gserve='nvm use; gulp clean; gulp serve'
alias gtest='nvm use; gulp test'
alias gtestserve='nvm use; gulp test-serve'
alias gbuild='nvm use; gulp clean; gulp preprocessors; gulp useref; gulp copy-files; gulp remove-code'
alias ge2e='gbuild; gulp test; gulp e2e;'
```