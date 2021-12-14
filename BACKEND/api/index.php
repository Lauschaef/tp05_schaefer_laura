<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    use \Firebase\JWT\JWT;
    
    require __DIR__ . '/../vendor/autoload.php';

    const JWT_SECRET = "tp05JWTKey";

    $options = [
        'attribute' => 'token',
        'header' => 'Authorization',
        'regexp' => "/Bearer\s+(.*)$/i",
        'secure' => false,
        'algorithm' => ['HS256'],
        'secret' => JWT_SECRET,
        'path' => ['/api'],
        'ignore' => ["/api/auth", "/api/login"],
        "error" => function ($response, $arguments) {
            $data = array("ERREUR" => "Connexion", "Erreur" => "JWT Non valide");
            $response = $response->withStatus(401);
            return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
        }
    ];

    function createJWT(Response $response) : Response {
        $issuedAt = time();
        $expirationTime = $issuedAt + 600;
        $payload = array(
            'userid' => $userid,
            'email' => $email,
            'pseudo' => $pseudo,
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );

        $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
        $response = $response->withHeader("Authorization","Bearer {$token_jwt}");

        return $response;
    }

    function addHeaders(Response $response) : Response {
        $response = $response
        ->withHeader("Content-Type","application/json")
        ->withHeader("Access-Control-Allow-Origin", "https://tp05-schaefer-laura.herokuapp.com/")
        ->withHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        ->withHeader("Access-Control-Expose-Headers", "Authorization");

        return $response;
    }
    
    $app = AppFactory::create();

    $app->get('/api/auth/{login}',
        function(Request $request, Response $response, $args){
            $login = $args['login'];
            if($login){
                $data = array('login' => $login);
                $response = addHeaders($response);
                $response = createJWT($response);
                $response->getBody()->write(json_encode($data));
            } else {
                $response = $response->withStatus(401);
            }
            return $response;
        }
    );

    $app->post('/api/login',
        function(Request $request, Response $response, $args){
            $error = false;
            $body = $request->getParsedBody();
            $login = $body['login']??"";
            $pwd = $body['pwd']??"";
            if($login != "Laura"){
                $error = true;
            }
            if($pwd != "123456"){
                $error = true;
            }
            if(!$error){
                $data = array('login' => $login, 'pwd' => $pwd);
                $response = addHeaders($response);
                $response = createJWT($response);
                $response->getBody()->write(json_encode($data));
            } else {
                $response = $response->withStatus(401);
            }
            return $response;
        }
    );

    $app->add(new Tuupola\Middleware\JwtAuthentication($options));

    $app->run();
?>