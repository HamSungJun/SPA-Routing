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

```javascript1.6

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

... 공부해볼게요

### References

- [SPA와 라우팅](https://heecheolman.tistory.com/41)
- [Single Page Application & Routing](https://poiemaweb.com/js-spa)
- [WindowEventHandlers.onpopstate](https://developer.mozilla.org/ko/docs/Web/API/WindowEventHandlers/onpopstate)

