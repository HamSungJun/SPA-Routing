# Single Page Application & Routing

## 시나리오.1 - 기본 주소로 접근하는 경우 `("/")`

> SPA(Single Page Application) 개발을 하게 되는 상황에서는 각 페이지 접근 상황마다 필요한 요소들을 다운받는 것이 아닌 첫 접근시에 필요한 모든 리소스를 내려받아 어플리케이션을 이용하는 동안 지속적으로 이용할 수 있게 하는 목적이다.

> 이를 통해 페이지 이동마다 리소스를 내려받는 트래픽을 없애고 렌더링 퍼포먼스도 향상 시킬 수 있다. 

1. 클라이언트는 서버에 접근
2. 서버는 어플리케이션에 필요한 모든 리소스를 전송
3. 클라이언트는 응답받은 리소스를 통해 어플리케이션을 렌더링
4. 클라이언트의 요청(Ajax)에 서버는 Data 단위로 응답.
5. 클라이언트는 Data를 통해 UI를 구성.

## 문제 상황.1

> 페이지마다 고유 URL을 갖던 기존 방식에서 SPA는 Ajax를 통한 렌더링을 수행하므로 URL 변경이 없다. 이러한 방식은 브라우저 History관리에서 첫 문제점이 생긴다.(뒤로가기, 앞으로가기)

## 해결 방안.1 

> `PJAX` 방식의 처리를 이용.

- [브라우저 히스토리 조작하기](https://developer.mozilla.org/ko/docs/Web/API/History_API)

```javascript 1.6

    # 브라우저 히스토리 변경 이벤트 발생시 history.go() || history.back()
    window.onpopstate = () => {
      
      console.log(`POP STATE OCCURED : ${JSON.stringify(event.state)}`)
  
    }

    window.onload = () => {

      # 주어진 <a> 태그에 이벤트 부착.
      document.querySelectorAll('.pushStateLink').forEach((el) => {
        el.addEventListener('click',(event)=>{

          # <a> 태그의 페이지 이동 기본 이벤트 해제.
          event.preventDefault()
          
          # 쿼리문만 가져오기 위해 split()
          let targetHref = event.target.href.split("/")

          # 쿼리문의 &&를 기준으로 split()
          let queryChunks = targetHref[targetHref.length-1].split("&&")
          let pushStateData = queryChunks.reduce((acc,curr) => {
            
            # 하나의 쿼리를 Key Value 쌍으로 split()
            let KV = curr.split("=")

            if(!(KV[0] in acc)){
              acc[KV[0]] = KV[1]
            }

            return acc

          },{})

          # pushState()함수에 대입할 상태 Object확인
          console.log(pushStateData)

          # 브라우저 URL에 대입한다. pushState()되면서 뒤로가기 버튼이 활성화된다.
          window.history.pushState(pushStateData,"",`?fruit=${pushStateData.fruit}&&cloth=${pushStateData.cloth}`)

        })
      })

      
    }
  

<body>
  <a class="pushStateLink" href="fruit=사과&&cloth=남방">사과와남방</a>
  <a class="pushStateLink" href="fruit=포도&&cloth=바지">포도와바지</a>
  <a class="pushStateLink" href="fruit=복숭아&&cloth=모자">복숭아와모자</a>
</body>

```

[예제 소스](./public/examples/scenario_1.html)

<hr />

## 시나리오.2 - 첫 접근이 쿼리문이 입력된 상태로 시작되는 경우 `("/?fruit=사과&&cloth=남방")`

> 서버로 접근하게 되는 경우 접근하는 URL에 따라 전달하는 Data나 리소스를 결정할 수 있는데 Single Page Application의 경우에는 접근하는 모든 라우팅에 대해서 같은 리소스를 응답하도록 설정한다.

```javascript 1.6

  const app = require('express')()
  const path = require('path)
  const port = process.env.PORT || 8080
  
  app.use(express.static(__dirname + '/public'))

  # 모든 GET 요청에 대해
  app.get('*',(req,res) => {

    # index.html 파일을 응답해준다.
    res.sendFile(path.resolve(__dirname,'index.html'))

  })

```

> 클라이언트는 URL입력값을 읽고 쿼리문이 동반된 접근인 것을 확인하고 렌더링 할 수 있어야 한다. GET요청 쿼리문의 경우 '?' 기호를 통해 구분할 수 있고 window.location 객체를 분석하여 쿼리문이 동반된 접근인지도 확인가능하다.

기본 경로로 접근한 경우
![location_1](./images/windowLocation_1.png)

쿼리를 동반하여 접근한 경우
![location_2](./images/windowLocation_2.png)

> `search` 프로퍼티를 확인하여 렌더링 동작을 분기시키면 될듯 하다... 실천에 옮겨보자



> 이후 페이지 내에서 동작하는 요소들은 `pushState()`로 컨트롤 하며 `PJAX` 방식으로 통신 및 렌더링 된다.
### References

- [SPA와 라우팅](https://heecheolman.tistory.com/41)
- [Single Page Application & Routing](https://poiemaweb.com/js-spa)
- [WindowEventHandlers.onpopstate](https://developer.mozilla.org/ko/docs/Web/API/WindowEventHandlers/onpopstate)
- [A node.js SPA server](https://gist.github.com/ryanoglesby08/1e1f49d87ae8ab2cabf45623fc36a7fe)
