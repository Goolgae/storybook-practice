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

## 간단한 컴포넌트 만들기

간단한 컴포넌트를 독립적으로 만들어봅시다.

우리는 [컴포넌트 기반 개발](https://www.componentdriven.org/) (CDD) 방법론에 따라 UI를 만들어 볼 것입니다. 이는 컴포넌트로부터 시작하여 마지막 화면에 이르기까지 상향적으로 UI를 개발하는 과정입니다. CDD는 UI를 구축할 때 직면하게 되는 규모의 복잡성을 해결하는 데 도움이 됩니다.

### Task 컴포넌트

![task](https://www.learnstorybook.com/intro-to-storybook/task-states-learnstorybook.png)

Task는 우리 앱의 핵심 컴포넌트입니다. 각각의 task는 현재 어떤 state에 있는지에 따라 약간씩 다르게 나타납니다. 선택된 (또는 선택되지 않은) 체크 박스, task에 대한 정보, 그리고 task를 위아래로 움직일 수 있도록 도와주는 "핀"버튼이 표시될 것입니다. 이를 위해 다음과 같은 prop들이 필요합니다.

- title – task를 설명해주는 문자열
- state - 현재 어떤 task가 목록에 있으며, 선택되어 있는지의 여부

Task 컴포넌트를 만들기 위해, 위에서 살펴본 여러 유형의 task에 해당하는 테스트 state를 작성합니다. 그런 다음 모의 데이터를 사용하여 독립적 환경에서 컴포넌트를 구축하기 위해 Storybook을 사용합니다. 각각의 state에 따라 컴포넌트의 모습을 수동으로 테스트하면서 진행할 것입니다.

## 설정하기

task의 기본 구현 부터 시작하겠습니다. 우리가 필요로 하는 속성들과 여러분이 task에 대해 취할 수 있는 두 가지 액션(목록 간 이동하는 것)을 간단히 살펴보도록 하겠습니다.

```js
// src/components/Task.js

import React from 'react';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly={true} />
    </div>
  );
}
```

위의 코드는 Todos 앱의 기존 HTML을 기반으로 Task에 대한 간단한 마크업을 렌더링 합니다.

아래의 코드는 Task의 세 가지 테스트 state를 스토리 파일에 작성한 것입니다.

```js
// src/components/Task.stories.js

import React from 'react';

import Task from './Task';

export default {
  component: Task,
  title: 'Task',
};

const Template = args => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};
```

Storybook은 컴포넌트와 그 하위 스토리의 두 가지 기본 단계로 구성되어 있습니다. 각 스토리는 해당 컴포넌트에 대응된다고 생각하시면 됩니다. 여러분은 얼마든지 필요한 만큼의 스토리를 컴포넌트별로 작성하실 수 있습니다.

- 컴포넌트
    - 스토리
    - 스토리
    - 스토리

Storybook에게 우리가 문서화하고 있는 컴포넌트에 대해 알려주기 위해, 아래 사항들을 포함하는 default export를 생성합니다.

- component --해당 컴포넌트,
- title -- Storybook 앱의 사이드바에서 컴포넌트를 참조하는 방법,
- excludeStories -- Storybook에서 스토리를 내보낼 때 렌더링에서 제외하는 것
- argTypes -- 각각의 스토리에서 인수(args)의 행동 방식을 명시합니다.

스토리를 정의하기 위해, 각각의 테스트 state에 해당하는 소토리를 만들기 위해서 우리는 함수를 내보냅니다. 스토리는 주어진 state안에서 렌더링된 요소 (애를 들자면 prop이 포함된 컴포넌트)를 리턴하는 함수입니다. 이는 함수형 컴포넌트와 같습니다.

우리 컴포넌트의 순열(permutations)이 여러 개이기 때문에 Template 변수에 할당하는 것이 편리합니다. 이 패턴을 스토리에 도입함으로써 작성하고 유지해야 하는 코드의 양이 줄어들 것입니다.

```
Template.bind({})는 함수의 복사본을 만드는 표준 JavaScript의 한 기법입니다.
우리는 이 기법을 사용하여 각각의 스토리가 고유한 속성(prop)을 갖지만 동시에 구현을 사용하도록 할 수 있습니다.
```

인수 또는 간단히 줄여서 args를 사용하여 Storybook을 다시 시작하지 않아고 Controls addon으로 컴포넌트를 실시간으로 수정할 수 있습니다. args의 값이 변하면 컴포넌트도 함께 변합니다.

스토리를 만들때 우리는 기본 task 인수를 사용하여 컴포넌트가 예상하는 task의 형태를 구성합니다. 이는 일반적으로 실제 데이터를 모델로 하여 만들어집니다. 다시 말하지만 export하는 것은 차후 스토리에서 이를 재사용 할 수 있도록 해줍니다.

```
액션은 UI 컴포넌트를 독립적으로 만들 때, 컴포넌트와의 상호작용을 확인하는데 도움이 됩니다.
종종, 앱의 컨텍스트에서 함수와 state에 접근하지 못할 수 있습니다.
이런 경우 action()을 사용하여 끼워 넣어주세요.
```

`매개변수(parameters)`는 일반적으로 Storybook의 기능과 애드온의 동작을 제어하기 위하여 사용됩니다. 우리의 경우에는 이를 사용하여 actions(mocked callbacks)이 처리되는 방식을 구성할 것입니다.

actions은 클릭이 되었을때 Storybook UI의 actions 패널에 나타날 콜백을 생성할수 있도록 해줍니다. 따라서 핀 버튼을 만들 때, 버튼 클릭이 성공적이었는지 테스트 UI에서 확인 할 수 있을 것입니다.

이 작업을 끝내신 후, Storybook 서버를 재시작하면 세 가지 task state에 관한 테스트 사례가 생성됩니다.

## State 구현하기

지금까지 Storybook 설정, 스타일 가져오기, 테스트 사례를 구성해보았습니다. 이제 디자인에 맞게 컴포넌트의 HTML을 구현하는 작업을 빠르게 시작 할 수 있습니다. 컴포넌트는 아직 기본만 갖춘 상태입니다. 너무 자세하지 않지만 우선 디자인을 이룰 수 있는 코드를 적어보겠습니다.

```js
// src/components/Task.js

import React from 'react';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}
```

## 데이터 요구 사항 명시하기

컴포넌트에 필요한 데이터 형태를 명시하려면 React에서 propTypes를 사용하는 것이 가장 좋습니다. 이는 자체적 문서화일 뿐만 아니라, 문제를 조기에 발견하는 데 도움이 됩니다.

```js
// src/components/Task.js

import React from 'react';
import PropTypes from 'prop-types';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  // ...
}

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};
```

이제 Task 컴포넌트가 잘못 사용된다면 경고가 나타날 것입니다.

```
동일한 목적을 달성하는 다른 방법으로는 Ts와 같은 타입 시스템의 Js를 사용하여 컴포넌트의 속성에 대한 타입을 만드는 것입니다.
```

## 완성!

지금까지 우리는 서버나 프론트엔드 앱 전체를 실행하지 않고 성공적으로 컴포넌트를 만들었습니다. 다음 단계는 이와 유사한 방법으로 Taskbox 컴포넌트의 남은 부분을 하나씩 만드는 것입니다.

보시다시피, 독립적 환경에서 컴포넌트를 제작하는 것은 쉽고 빠릅니다. 가능한 모든 state를 테스트할 수 있기 때문에 버그가 적고 높은 퀄리티의 UI를 제작할 수 있습니다.

## 자동화된 테스트

Storybook은 우리 앱의 UI를 만드는 동안 수동으로 테스트할 수 있는 좋은 방법을 제공해주었습니다. '스토리'는 앱을 계속해서 개발하는 동안 Task 컴포넌트의 외관을 망가뜨리지는 않았는지 확인하는 것을 도와줍니다. 그러나 지금 단계는 완전히 수동적 프로세스이기 때문에 누군가 각 테스트를 일일이 클릭하여 오류나 경고 없이 렌더링 되는지 살펴봐야 합니다. 이를 자동화할 수는 없을까요?

## 스냅샷 테스트

스냅샷 테스트 (Snapshot)는 주어진 입력에 대해 컴포넌트의 "양호한" 출력 값을 기록한 다음, 향후 출력 값이 변할떄마다 컴포넌트에 플래그를 지정하는 방식을 말합니다. 이는 새로운 버전의 컴포넌트를 보고 바뀐 부분을 빠르게 확인할 수 있기 때문에 Storybook을 보완해 줄 수 있습니다.