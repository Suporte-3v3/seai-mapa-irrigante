# Instalar Front-End irrigante

## Na máquina que for instalar o sistema terá que executar os seguintes passos

### Acesse a pasta do seai-mapa-irrigante e dentro dela execute os seguintes passos:

### 1 - Criar o arquivo `.env` e ajustar as variáveis ambiente do arquivo apontando para a URL da API

```bash
VITE_API_BASE_URL="http://url_da_api/api"
VITE_API_BASE_URL_V1="http://url_da_api/api/v1"
VITE_API_BASE_URL_V2="http://url_da_api/api/v2"
```

## 2 - Rodar a aplicação

### Método 1 - Usando docker compose

Basta executar o comando abaixo que irá sempre executar a build e já subir o container.

```bash
docker compose up --build -d
```

### Método 2 - Sem usar docker compose

Antes de subir uma nova alteração para o ambiente de produção, é necessário primeiro garantir que não haverá conflito de imagens e containers do irrigante.

Deletar o container já em execução

```bash
docker container rm -f irrigant-front-app
```

Execute o comando abaixo e verifique se o container **irrigant-front-app** não está mais na lista

```bash
docker container ls
```

Deletar a imagem antiga do front do irrigante

```bash
docker image rm irr-front-img
```

Execute o comando abaixo e cheque se a imagem irr-front-img de fato não está na lista

```bash
docker images
```

**Subir o serviço**

Gerar a build do sistema do irrigante (Aguarde a build terminar)

```bash
docker image build -t irr-front-img -f Dockerfile .
```

Executar a aplicação do frontend do irrigante

```bash
docker container run -d --env-file .env --network host --name irrigant-front-app irr-front-img
```

Checar se o container irrigant-front-app subiu mesmo

```bash
docker container ls
```

Checar os logs do serviço

```bash
docker container logs -f --tail 10 irrigant-front-app
```

O frontend irá subir rodando no [localhost](http://localhost) da máquina na porta **3333**. Então ao acessar a URL do sistema do irrigante irá acessar a página.
