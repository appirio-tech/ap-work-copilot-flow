# AP Copilot Flow

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

## Development
```
alias gserve='nvm use; gulp clean; gulp serve'
alias gtest='nvm use; gulp test'
alias gtestserve='nvm use; gulp test-serve'
alias gbuild='nvm use; gulp clean; gulp preprocessors; gulp useref; gulp copy-files; gulp remove-code'
alias ge2e='gbuild; gulp test; gulp e2e;'
```