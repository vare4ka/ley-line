# Tech task for frontend developer position

## Setup

Install the dependencies, then run the server in development mode:

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Comments

As I'm a Frontend engineer, I haven't implemented backend side or communication with database. I mocked the API requests instead.

Of course, in ideal world this app should run on Web Sockets and some green notification popups in the bottom corner about the updates.
I just made two UI views - one for Party A and the second for Party B.

Also we could use "redux-persist" for syncronizing browser tabs, but it would take much longer time then estimated for test task.

I have chosen Redux Toolkit for state management as it's convenient, modern and laconic tool.

I haven't paid much attention to design and mobile markup here, but if colaborating with designer we could achieve quite a stylish application :)
Also there is no API errors handling because API is mocked, but I'll leave comments where they could be in real situation.

Ideally instead of number inputs there should be small non-editable inputs with "+" and "-", like increment counters. Also I just noticed that Party B can only raise, so for him there would be just "+" button.

And the last - in real app we should create a components library for buttons, inputs etc.