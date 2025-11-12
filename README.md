# 🔗 Sistema Distribuído RPC - Python

## 🎯 Sobre o Projeto
Implementação de um sistema **cliente-servidor** usando **XML-RPC** para demonstração de conceitos de sistemas distribuídos.

### ⚡ Funcionalidades
- ✅ **Servidor RPC** escutando na porta 8000
- ✅ **Cliente RPC** com interface interativa  
- ✅ **Comunicação remota** via XML-RPC
- ✅ **Conversão de texto** para maiúsculas
- ✅ **Logs detalhados** do fluxo de execução
- ✅ **Ambiente virtual** Python isolado

## 🚀 Como Executar

### 1️⃣ Execução Rápida
```python
# Clone o repositório
!git clone https://github.com/alfredo-allan/sistema-rpc-python.git
%cd sistema-rpc-python

# Execute o sistema completo
!python testador_completo.py

2️⃣ Execução Passo a Passo
python

# Terminal 1 - Servidor
!python servidor.py

# Terminal 2 - Cliente  
!python cliente.py

3️⃣ Execução com Ambiente Virtual
python

# Criar ambiente virtual
!python -m venv venv

# Ativar no Linux/Mac
!source venv/bin/activate

# Ativar no Windows  
!venv\Scripts\activate

# Instalar dependências
!pip install colorama

# Executar sistema
!python testador_completo.py

📁 Estrutura do Projeto
text

sistema-rpc-python/
├── 📄 requirements.txt
├── 🖥️  servidor.py
├── 💻 cliente.py  
├── 🔧 testador_completo.py
└── 📚 README.md

🛠️ Tecnologias

    Python 3.8+

    XML-RPC (biblioteca padrão)

    Threading para concorrência

    Colorama para logs coloridos (opcional)

📋 Exemplo de Uso
Entrada:
python

# Cliente envia:
"python rpc sistemas distribuídos"

Saída:
python

# Servidor processa e retorna:
"PYTHON RPC SISTEMAS DISTRIBUÍDOS"

🎮 Demo Interativa

O sistema inclui uma demonstração automática que testa 5 palavras diferentes:

    python → PYTHON

    sistemas distribuídos → SISTEMAS DISTRIBUÍDOS

    xml-rpc → XML-RPC

    universidade → UNIVERSIDADE

    finalizar → Encerra a demo

📊 Fluxo do Sistema

    🟦 Servidor inicia na porta 8000

    🟩 Cliente conecta via HTTP/XML-RPC

    📤 Cliente envia requisição

    ⚙️ Servidor processa e converte texto

    📥 Cliente recebe resposta

    ✅ Exibe resultado e métricas

🐛 Solução de Problemas
Erro de Conexão
python

# Verifique se o servidor está rodando
!netstat -tulpn | grep 8000

# Ou reinicie o servidor
!pkill -f "python servidor.py"
!python servidor.py

Porta Ocupada
python

# Libere a porta 8000
!fuser -k 8000/tcp

👨‍💻 Desenvolvido para

    Disciplina: Sistemas Distribuídos

    Demonstração: Arquitetura Cliente-Servidor

    Tecnologia: Chamada de Procedimento Remoto (RPC)

📞 Contato

Desenvolvedor: Alfredo Allan
Email: kali.sonic.developer@gmail.com
Repositório: github.com/alfredo-allan/sistema-rpc-python
