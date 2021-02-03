# React를 위한 Storybook 튜토리얼

Storybook을 개발 환경에 설치해봅시다

Storybook은 개발 모드에서 앱과 함께 실행됩니다. 이것은 비즈니스 로직과 컨테스트로부터 UI 컴포넌트를 독립적으로 분리하여 만들수 있도록 도와줍니다.

![스토리북](https://www.learnstorybook.com/intro-to-storybook/storybook-relationship.jpg)

## React Storybook 설치하기

```python
# Create our application:
npx create-react-app taskbox

cd taskbox

# Add Storybook:
npx -p @storybook/cli sb init
```

```
이 튜토리얼에서는 yarn쓸거임, 만약 Yarn을 설치했지만 npm을 사용하는 것을 선호하신다면, 걱정 마세요.
그래도 아무 문제없이 튜토리얼을 진행하실 수 있습니다. 
간단히 --use-npm 플래그를 추가하면 이를 기반으로 CRA와 Storybook이 초기 설정됩니다.
또한, 이 튜토리얼을 진행하시면서 npm에 맞게 수정하는 것을 잊지 마세요.라고 친절하게 말해줄게용
```

우리는 다양한 환경에서 애플리케이션이 올바르게 작동하는지 다음 명령어를 통해 빠르게 확인할 수 있습니다.

```python
# Run the test runner (Jest) in a terminal:
yarn test --watchAll

# Start the component explorer on port 6006:
yarn storybook

# Run the frontend app proper on port 3000:
yarn start
```

```python
테스트 명령어에 --watchAll 플래그가 추가된 것을 보셨을 수 있습니다. 이것은 의도적인 것으로,
이 덕분에 모든 테스트가 실행되고 애플리케이션이 정상임을 확인할 수 있습니다.
이 튜토리얼을 진행하시는 동안 다양한 테스트 시나리오를 소개해드릴 것이며,
package.json의 테스트 스크립트 부분에 이 플래스를 추가하여 모든 테스트가 실행되도록 할 수 있습니다.
```

프론트엔드 앱의 3가지 양상 : 자동화된 테스트 (Jest), 컴포넌트 개발 (Storybook), 그리고 앱 그 자체

![3가지 양상](https://www.learnstorybook.com/intro-to-storybook/app-three-modalities.png)

앱의 어느 부분을 작업하고 계신가에 따라, 하나 또는 그 이상을 동시에 실행하기를 원하실 수 있습니다. 현재는 단일 UI 컴포넌트를 만드는 데 초점을 두고 있기 때문에, Storybook을 계속 실행하도록 하겠습니다.