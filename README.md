# AP Copilot

## Docs

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