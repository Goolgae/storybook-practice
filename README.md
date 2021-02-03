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

