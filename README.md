# miyako

fly.io + rabbitmq + MQTT over WebSocket

![miyako](./documents/FyBBCXXaIAIZ-8h.jpg)

fly.io에서는 무료로 제공하는 자원이 있는데 몇가지 제약이 있다.
[Fly.io Resource Pricing](https://fly.io/docs/about/pricing/)
2023/12/15 기준

* [Free allowances](https://fly.io/docs/about/pricing/#free-allowances)
	* Up to 3 shared-cpu-1x 256mb VMs
	* 3GB persistent volume storage (total)
	* 160GB outbound data transfer
* [Anycast IP addresses](https://fly.io/docs/about/pricing/#anycast-ip-addresses)
	* Each application receives a shared IPv4 address and unlimited Anycast IPv6 addresses for global load balancing.
* [Shared IPv4](https://fly.io/docs/reference/services/#shared-ipv4)
	* HTTP on port 80, or
	* TLS & HTTP on port 443

miyako의 목표는 다음과 같다.

* shared-cpu-1x 256mb VM 하나에 rabbitmq를 띄운다 (무료)
* ipv4를 통해서 MQTT over WebSocket를 노출한다 (무료)

miyako의 빅픽쳐는 다음과 같다. (귀찮아서 안할듯?)

* 다양한 rabbitmq plugins을 넣어서 많은 프로토콜을 지원한다.
* http proxy를 통해서 MQTT over WebSocket, STOMP over WebSocket과 같은 프로토콜을 동시에 지원한다.

## production
### 배포

```sh
# 배포
fly deploy

# 권한 설정
fly secrets set RABBITMQ_DEFAULT_USER=TODO_user
fly secrets set RABBITMQ_DEFAULT_PASS=TODO_password

# 비용 줄이려고 machine은 1개만 사용
fly scale show
fly scale count 1
```

### management

외부 접속이 막혀있어서 프록시 써야 management에 접속할 수 있다.
localhost에서의 포트 충돌을 피하려고 프록시의 포트번호는 기본값과 다르게 설정한다.
15672만 아니면 된다.

```sh
fly proxy --app miyako-rabbitmq 15673:15672
http://localhost:15673/
```

### 테스트

`cp samples/.env.sample samples/.env.local`
`.env.local`을 적절히 수정한다.

```sh
$ cd examples/
$ pnpm i
$ pnpm start:env

> examples@1.0.0 start:env C:\dev\miyako-rabbitmq\examples
> node --env-file .env.local src/mqtt_simple.mjs

wss://guest:guest@miyako-rabbitmq.fly.dev/ws
connect
subscribe [ { topic: '/priv/room/sample', qos: 0 } ]
/priv/room/sample now: 2023-12-14T16:59:45.374Z
```

## localhost

`Dockerfile`이 올바른지 검증하려면 로컬에서 띄워서 테스트하는게 확실하다.

```sh
podman build -t miyako-rabbitmq .
docker-compose up -d
http://127.0.0.1:15672/
id: guest / pw: guest
```

페이지에 접속되면 간단한 스크립트로 MQTT over WebSocket를 테스트해본다.

```sh
$ cd examples/
$ pnpm i
$ pnpm start:localhost

> examples@1.0.0 start:localhost C:\dev\miyako-rabbitmq\examples
> node src/mqtt_simple.mjs

ws://guest:guest@127.0.0.1:15675/ws
connect
subscribe [ { topic: '/priv/room/sample', qos: 0 } ]
/priv/room/sample now: 2023-12-14T16:46:44.600Z
```

## user

management까지 접속할 수 있는 최상위 권한을 고작 mqtt 목적으로 쓰고싶지 않다.
유저를 적절히 추가한다.

1. Admin -> Add User -> 생성된 유저의 상페 페이지로 이동
2. permission 추가 (기본값으로 생성해도 문제없음)
	* virtual host: /
	* Configure regexp: .*
	* Write regexp: .*
	* Read regexp: .*

주의: fly.io deploy 다시 하면 설정된 계정 정보가 날아간다.
계정 정보를 저장하는 다른 방법을 찾아야하는데 일단은 admin 써도 버틸수 있으니까 나중에 검토

## note

참고 링크
https://medium.com/@stefannovak96/hosting-rabbitmq-on-fly-io-in-5-minutes-e749dbb476f1


```erlang
[
	rabbitmq_management,
	rabbitmq_mqtt,
	rabbitmq_web_mqtt,
	rabbitmq_stomp,
	rabbitmq_web_stomp
].
```

rabbitmq plugins은 위와같이 많이 있지만 메모리를 아끼기 위해서 최소한으로만 사용할 예정이다.
