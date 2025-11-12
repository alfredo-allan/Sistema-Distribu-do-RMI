// scripts.js - Código JavaScript completo integrado
class PythonRPCDemo {
  constructor() {
    this.files = {
      "requirements.txt": `# Sistema Distribuído RPC - Python
# Dependências do projeto

# XML-RPC já vem com Python, não precisa de dependências externas
# Estas são apenas para melhorias opcionais
colorama==0.4.6
`,

      "servidor.py": `from xmlrpc.server import SimpleXMLRPCServer
import threading
import time
from datetime import datetime

class ServidorRPC:
    def __init__(self):
        self.servidor = None
        self.log("Servidor RPC inicializado")
    
    def log(self, mensagem):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] [Servidor] {mensagem}")
    
    def converter_para_maiuscula(self, palavra):
        self.log(f"Recebendo requisição: '{palavra}'")
        
        # Simula processamento
        time.sleep(1)
        resultado = palavra.upper()
        
        self.log(f"Processamento concluído: '{resultado}'")
        return resultado
    
    def status_servidor(self):
        self.log("Verificando status do servidor")
        return {
            "status": "online",
            "porta": 8000,
            "servicos": ["converter_para_maiuscula", "status_servidor"],
            "timestamp": datetime.now().isoformat()
        }
    
    def iniciar_servidor(self):
        try:
            self.log("Iniciando servidor na porta 8000...")
            self.servidor = SimpleXMLRPCServer(("localhost", 8000), logRequests=False)
            
            # Registra os métodos
            self.servidor.register_instance(self)
            self.servidor.register_function(lambda: "Servidor RPC Python", "nome_servidor")
            
            self.log("Servidor pronto! Registrados 3 métodos:")
            self.log("   - converter_para_maiuscula(string)")
            self.log("   - status_servidor()")
            self.log("   - nome_servidor()")
            self.log("Aguardando conexões...")
            
            # Inicia o servidor
            self.servidor.serve_forever()
            
        except Exception as e:
            self.log(f"Erro ao iniciar servidor: {e}")
            raise

def main():
    print("INICIANDO SISTEMA DISTRIBUÍDO RPC")
    print("=" * 50)
    
    servidor = ServidorRPC()
    
    # Inicia em thread separada
    thread_servidor = threading.Thread(target=servidor.iniciar_servidor)
    thread_servidor.daemon = True
    thread_servidor.start()
    
    # Mantém o programa principal vivo
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Servidor interrompido pelo usuário")

if __name__ == "__main__":
    main()
`,

      "cliente.py": `import xmlrpc.client
import time
from datetime import datetime

class ClienteRPC:
    def __init__(self):
        self.servidor = None
        self.log("Cliente RPC inicializado")
    
    def log(self, mensagem):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] [Cliente] {mensagem}")
    
    def conectar_servidor(self, max_tentativas=3):
        for tentativa in range(max_tentativas):
            try:
                self.log(f"Tentativa {tentativa + 1} de conexão...")
                
                self.servidor = xmlrpc.client.ServerProxy("http://localhost:8000")
                
                # Testa a conexão
                nome = self.servidor.nome_servidor()
                self.log(f"Conectado com sucesso! Servidor: {nome}")
                
                # Mostra status do servidor
                status = self.servidor.status_servidor()
                self.log(f"Status do servidor: {status['status']}")
                self.log(f"Porta: {status['porta']}")
                self.log(f"Serviços: {', '.join(status['servicos'])}")
                
                return True
                
            except ConnectionRefusedError:
                self.log("Servidor não encontrado. Verifique se o servidor está rodando.")
                if tentativa < max_tentativas - 1:
                    self.log("Aguardando 2 segundos para nova tentativa...")
                    time.sleep(2)
            except Exception as e:
                self.log(f"Erro na conexão: {e}")
                break
        
        return False
    
    def executar_teste(self, palavra):
        if not self.servidor:
            self.log("Cliente não conectado ao servidor")
            return None
        
        try:
            self.log(f"Enviando palavra para conversão: '{palavra}'")
            
            inicio = time.time()
            resultado = self.servidor.converter_para_maiuscula(palavra)
            tempo_processamento = time.time() - inicio
            
            self.log(f"Resposta recebida: '{resultado}'")
            self.log(f"Tempo de processamento: {tempo_processamento:.2f}s")
            
            return resultado
            
        except Exception as e:
            self.log(f"Erro durante a chamada RPC: {e}")
            return null
    
    def executar_demo_interativa(self):
        self.log("Iniciando demonstração interativa...")
        
        if not self.conectar_servidor():
            return
        
        print("\\n" + "="*50)
        print("MODO DEMONSTRAÇÃO INTERATIVA")
        print("="*50)
        
        palavras_teste = [
            "python",
            "sistemas distribuídos",
            "xml-rpc",
            "universidade",
            "finalizar"
        ]
        
        for i, palavra in enumerate(palavras_teste, 1):
            print(f"\\n--- Teste {i}/5 ---")
            
            if palavra.toLowerCase() === "finalizar":
                self.log("Demonstração concluída")
                break
            
            resultado = self.executar_teste(palavra)
            
            if resultado:
                print(f"Entrada: {palavra}")
                print(f"Saída: {resultado}")
                print("Sucesso!")
            
            if i < len(palavras_teste) - 1:
                time.sleep(1)

def main():
    print("CLIENTE RPC - SISTEMA DISTRIBUÍDO")
    print("=" * 40)
    
    cliente = ClienteRPC()
    
    # Modo interativo
    try:
        cliente.executar_demo_interativa()
    except KeyboardInterrupt:
        print("Cliente finalizado pelo usuário")

if __name__ == "__main__":
    main()
`,

      "testador_completo.py": `#!/usr/bin/env python3
"""
Sistema Distribuído RPC - Testador Completo
Demonstra o funcionamento do sistema cliente-servidor
"""

import subprocess
import sys
import time
import threading
from datetime import datetime

class TestadorSistema:
    def __init__(self):
        self.processo_servidor = None
        self.log("Testador de Sistema Distribuído RPC inicializado")
    
    def log(self, mensagem, tipo="TESTADOR"):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] [{tipo}] {mensagem}")
    
    def executar_comando(self, comando, descricao):
        self.log(f"Executando: {descricao}")
        self.log(f"Comando: {comando}", "COMANDO")
        
        try:
            resultado = subprocess.run(
                comando, 
                shell=True, 
                capture_output=True, 
                text=True,
                timeout=30
            )
            
            if resultado.returncode == 0:
                self.log(f"{descricao} - Sucesso!", "SUCESSO")
                return resultado.stdout
            else:
                self.log(f"{descricao} - Falhou!", "ERRO")
                self.log(f"Erro: {resultado.stderr}", "ERRO")
                return None
                
        except subprocess.TimeoutExpired:
            self.log(f"{descricao} - Timeout!", "TIMEOUT")
            return None
        except Exception as e:
            self.log(f"{descricao} - Erro: {e}", "ERRO")
            return None
    
    def criar_ambiente_virtual(self):
        self.log("Criando ambiente virtual Python...")
        
        # Verifica se o venv está disponível
        resultado = self.executar_comando(
            "python3 -m venv --help", 
            "Verificando suporte a venv"
        )
        
        if resultado is None:
            self.log("Criando ambiente virtual manualmente...")
            # Cria estrutura básica do venv
            import os
            os.makedirs("venv/bin", exist_ok=True)
            os.makedirs("venv/lib", exist_ok=True)
            self.log("Estrutura de venv criada manualmente")
            return True
        
        # Cria o ambiente virtual
        return self.executar_comando(
            "python3 -m venv venv", 
            "Criando ambiente virtual 'venv'"
        ) is not None
    
    def instalar_dependencias(self):
        self.log("Instalando dependências...")
        
        # Ativa venv e instala dependências
        if sys.platform == "win32":
            comando_ativacao = "venv\\\\Scripts\\\\activate && pip install colorama"
        else:
            comando_ativacao = "source venv/bin/activate && pip install colorama"
        
        return self.executar_comando(
            comando_ativacao,
            "Instalando pacotes no ambiente virtual"
        ) is not None
    
    def iniciar_servidor_background(self):
        self.log("Iniciando servidor em background...")
        
        def executar_servidor():
            if sys.platform == "win32":
                comando = "venv\\\\Scripts\\\\python.exe servidor.py"
            else:
                comando = "venv/bin/python servidor.py"
            
            self.processo_servidor = subprocess.Popen(
                comando,
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Lê a saída do servidor
            for linha in self.processo_servidor.stdout:
                print(f"{linha}", end='')
        
        thread_servidor = threading.Thread(target=executar_servidor)
        thread_servidor.daemon = True
        thread_servidor.start()
        
        # Aguarda o servidor iniciar
        time.sleep(3)
        return True
    
    def executar_cliente(self):
        self.log("Executando cliente...")
        
        if sys.platform == "win32":
            comando = "venv\\\\Scripts\\\\python.exe cliente.py"
        else:
            comando = "venv/bin/python cliente.py"
        
        resultado = self.executar_comando(comando, "Executando cliente RPC")
        
        if resultado:
            print("\\n" + "="*60)
            print("SAÍDA DO CLIENTE:")
            print("="*60)
            print(resultado)
            return True
        return False
    
    def parar_servidor(self):
        if self.processo_servidor:
            self.log("Parando servidor...")
            self.processo_servidor.terminate()
            self.processo_servidor.wait()
            self.log("Servidor parado")
    
    def executar_teste_completo(self):
        self.log("INICIANDO TESTE COMPLETO DO SISTEMA", "INICIO")
        print("=" * 70)
        
        try:
            # 1. Criar ambiente virtual
            if not self.criar_ambiente_virtual():
                return False
            
            # 2. Instalar dependências
            if not self.instalar_dependencias():
                return False
            
            # 3. Iniciar servidor
            if not self.iniciar_servidor_background():
                return False
            
            # 4. Aguardar servidor estabilizar
            self.log("Aguardando servidor estabilizar...")
            time.sleep(2)
            
            # 5. Executar cliente
            if not self.executar_cliente():
                return False
            
            self.log("TESTE COMPLETADO COM SUCESSO!", "FIM")
            return True
            
        except Exception as e:
            self.log(f"ERRO DURANTE O TESTE: {e}", "ERRO")
            return False
        finally:
            self.parar_servidor()
    
    def demonstrar_arquivos(self):
        self.log("ESTRUTURA DE ARQUIVOS DO PROJETO", "ARQUIVOS")
        print("\\n" + "="*50)
        print("sistema_rpc_python/")
        print("├── requirements.txt")
        print("├── servidor.py")
        print("├── cliente.py")
        print("├── testador_completo.py")
        print("└── venv/ (ambiente virtual)")
        print("="*50)
        
        self.log("Conteúdo dos arquivos principais:", "ARQUIVOS")
        
        arquivos = ['requirements.txt', 'servidor.py', 'cliente.py']
        for arquivo in arquivos:
            print(f"\\n--- {arquivo} ---")
            try:
                with open(arquivo, 'r', encoding='utf-8') as f:
                    conteudo = f.read()
                    # Mostra apenas as primeiras linhas
                    linhas = conteudo.split('\\n')[:10]
                    for linha in linhas:
                        print(f"    {linha}")
                    if len(conteudo.split('\\n')) > 10:
                        print("    ... (arquivo continua)")
            except FileNotFoundError:
                print(f"    Arquivo {arquivo} não encontrado")

def main():
    testador = TestadorSistema()
    
    print("SISTEMA DISTRIBUÍDO RPC - DEMONSTRAÇÃO COMPLETA")
    print("=" * 65)
    
    # Mostra estrutura de arquivos
    testador.demonstrar_arquivos()
    
    input("\\nPressione Enter para iniciar a execução do sistema...")
    
    # Executa teste completo
    sucesso = testador.executar_teste_completo()
    
    if sucesso:
        print("\\n" + "="*20)
        print("DEMONSTRAÇÃO CONCLUÍDA COM SUCESSO!")
        print("="*20)
        print("\\nO sistema demonstrou:")
        print("   ✅ Comunicação cliente-servidor via XML-RPC")
        print("   ✅ Chamadas de procedimento remoto (RPC)")
        print("   ✅ Processamento distribuído")
        print("   ✅ Tratamento de erros e logs")
        print("   ✅ Ambiente virtual isolado")
    else:
        print("\\n❌ Demonstração encontrou problemas.")
        print("   Verifique os logs acima para detalhes.")

if __name__ == "__main__":
    main()
`,
    };

    this.terminalOutput = "";
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.createFileStructure();
  }

  setupEventListeners() {
    // Botão de criar arquivos
    document.getElementById("createFilesBtn").addEventListener("click", () => {
      this.createAllFiles();
    });

    // Botão de executar demo
    document.getElementById("runDemoBtn").addEventListener("click", () => {
      this.runCompleteDemo();
    });

    // Botão de limpar terminal
    document
      .getElementById("clearTerminalBtn")
      .addEventListener("click", () => {
        this.clearTerminal();
      });

    // Botão de download
    document
      .getElementById("downloadFilesBtn")
      .addEventListener("click", () => {
        this.downloadFiles();
      });
  }

  createFileStructure() {
    const fileList = document.getElementById("fileList");
    if (!fileList) return;

    fileList.innerHTML = "";

    Object.keys(this.files).forEach((filename) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
                        <div>
                            <i class="bi bi-file-code me-2"></i>
                            ${filename}
                        </div>
                        <button class="btn btn-sm btn-outline-primary view-file" data-file="${filename}">
                            <i class="bi bi-eye"></i> Ver
                        </button>
                    `;
      fileList.appendChild(li);
    });

    // Adiciona event listeners para os botões de visualização
    document.querySelectorAll(".view-file").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const filename = e.target.closest("button").dataset.file;
        this.showFileContent(filename);
      });
    });
  }

  showFileContent(filename) {
    const content = this.files[filename];
    const modal = new bootstrap.Modal(document.getElementById("fileModal"));
    const modalTitle = document.getElementById("fileModalLabel");
    const modalBody = document.getElementById("fileModalBody");

    modalTitle.textContent = filename;
    modalBody.innerHTML = `<pre class="code-container"><code>${this.highlightPythonCode(
      content
    )}</code></pre>`;

    modal.show();
  }

  highlightPythonCode(code) {
    // Simples highlight para Python
    return code
      .replace(/(#.*$)/gm, '<span class="comment">$1</span>')
      .replace(
        /(def|class|import|from|return|try|except|if|else|for|while|in|and|or|not)/g,
        '<span class="keyword">$1</span>'
      )
      .replace(
        /(self|True|False|None)/g,
        '<span class="python-builtin">$1</span>'
      )
      .replace(/(["'])(.*?)\1/g, '<span class="string">$1$2$1</span>');
  }

  createAllFiles() {
    this.logToTerminal("📁 Criando estrutura de arquivos...", "system");

    Object.keys(this.files).forEach((filename) => {
      this.createFile(filename);
    });

    this.logToTerminal("✅ Todos os arquivos criados com sucesso!", "success");
    this.logToTerminal(
      "💡 Agora você pode executar a demonstração completa.",
      "info"
    );
  }

  createFile(filename) {
    // Simula a criação de arquivos
    this.logToTerminal(`📄 Criando ${filename}...`, "info");

    // Simula delay de criação
    setTimeout(() => {
      this.logToTerminal(`✅ ${filename} criado com sucesso`, "success");

      // Mostra preview do arquivo criado
      if (filename === "requirements.txt") {
        this.logToTerminal("📋 Conteúdo do requirements.txt:", "system");
        this.logToTerminal(this.files[filename], "code");
      }
    }, 500);
  }

  runCompleteDemo() {
    this.logToTerminal(
      "🚀 INICIANDO DEMONSTRAÇÃO COMPLETA DO SISTEMA",
      "system"
    );
    this.logToTerminal("=".repeat(60), "system");

    // Simula os passos da demonstração
    const steps = [
      {
        delay: 1000,
        action: "Criando ambiente virtual...",
        type: "info",
      },
      {
        delay: 2000,
        action: "✅ Ambiente virtual criado: venv/",
        type: "success",
      },
      { delay: 1000, action: "Instalando dependências...", type: "info" },
      {
        delay: 1500,
        action: "✅ Dependências instaladas com sucesso",
        type: "success",
      },
      {
        delay: 1000,
        action: "Iniciando servidor RPC na porta 8000...",
        type: "info",
      },
      {
        delay: 2000,
        action: "🟦 [14:30:15] [Servidor] Servidor RPC inicializado",
        type: "server",
      },
      {
        delay: 500,
        action: "🟦 [14:30:15] [Servidor] Iniciando servidor na porta 8000...",
        type: "server",
      },
      {
        delay: 1000,
        action:
          "🟦 [14:30:16] [Servidor] ✅ Servidor pronto! Registrados 3 métodos:",
        type: "server",
      },
      {
        delay: 500,
        action: "🟦 [14:30:16] [Servidor] Aguardando conexões...",
        type: "server",
      },
      { delay: 1000, action: "Executando cliente RPC...", type: "info" },
      {
        delay: 500,
        action: "🟩 [14:30:17] [Cliente] Cliente RPC inicializado",
        type: "client",
      },
      {
        delay: 500,
        action: "🟩 [14:30:17] [Cliente] Tentativa 1 de conexão...",
        type: "client",
      },
      {
        delay: 1000,
        action:
          "🟩 [14:30:18] [Cliente] ✅ Conectado com sucesso! Servidor: Servidor RPC Python",
        type: "client",
      },
      {
        delay: 500,
        action: "🟩 [14:30:18] [Cliente] Iniciando demonstração interativa...",
        type: "client",
      },
      {
        delay: 1000,
        action: "\\n🎮 MODO DEMONSTRAÇÃO INTERATIVA",
        type: "system",
      },
      { delay: 500, action: "=".repeat(50), type: "system" },
      { delay: 1000, action: "\\n--- Teste 1/5 ---", type: "info" },
      {
        delay: 500,
        action:
          '🟩 [14:30:19] [Cliente] 📤 Enviando palavra para conversão: "python"',
        type: "client",
      },
      {
        delay: 1000,
        action: '🟦 [14:30:19] [Servidor] Recebendo requisição: "python"',
        type: "server",
      },
      {
        delay: 1000,
        action: '🟦 [14:30:20] [Servidor] Processamento concluído: "PYTHON"',
        type: "server",
      },
      {
        delay: 500,
        action: '🟩 [14:30:20] [Cliente] 📥 Resposta recebida: "PYTHON"',
        type: "client",
      },
      {
        delay: 500,
        action: "🟩 [14:30:20] [Cliente] ⏱️  Tempo de processamento: 1.02s",
        type: "client",
      },
      { delay: 500, action: "🔷 Entrada: python", type: "input" },
      { delay: 500, action: "🟢 Saída: PYTHON", type: "output" },
      { delay: 500, action: "✅ Sucesso!", type: "success" },
      { delay: 1000, action: "\\n--- Teste 2/5 ---", type: "info" },
      {
        delay: 500,
        action:
          '🟩 [14:30:21] [Cliente] 📤 Enviando palavra para conversão: "sistemas distribuídos"',
        type: "client",
      },
      {
        delay: 1000,
        action:
          '🟦 [14:30:21] [Servidor] Recebendo requisição: "sistemas distribuídos"',
        type: "server",
      },
      {
        delay: 1000,
        action:
          '🟦 [14:30:22] [Servidor] Processamento concluído: "SISTEMAS DISTRIBUÍDOS"',
        type: "server",
      },
      {
        delay: 500,
        action:
          '🟩 [14:30:22] [Cliente] 📥 Resposta recebida: "SISTEMAS DISTRIBUÍDOS"',
        type: "client",
      },
      {
        delay: 500,
        action: "🔷 Entrada: sistemas distribuídos",
        type: "input",
      },
      {
        delay: 500,
        action: "🟢 Saída: SISTEMAS DISTRIBUÍDOS",
        type: "output",
      },
      { delay: 500, action: "✅ Sucesso!", type: "success" },
      {
        delay: 2000,
        action: "\\n🎊 DEMONSTRAÇÃO CONCLUÍDA COM SUCESSO!",
        type: "success",
      },
      {
        delay: 500,
        action:
          "📚 O sistema demonstrou comunicação cliente-servidor via XML-RPC",
        type: "info",
      },
      {
        delay: 500,
        action:
          "com chamadas de procedimento remoto e processamento distribuído.",
        type: "info",
      },
    ];

    let totalDelay = 0;
    steps.forEach((step) => {
      totalDelay += step.delay;
      setTimeout(() => {
        this.logToTerminal(step.action, step.type);
      }, totalDelay);
    });
  }

  logToTerminal(message, type = "info") {
    const terminal = document.getElementById("terminalOutput");
    if (!terminal) return;

    const line = document.createElement("div");
    line.className = `console-line console-${type}`;

    // Adiciona ícones baseados no tipo
    let icon = "";
    switch (type) {
      case "success":
        icon = "✅";
        break;
      case "error":
        icon = "❌";
        break;
      case "warning":
        icon = "⚠️";
        break;
      case "server":
        icon = "🟦";
        break;
      case "client":
        icon = "🟩";
        break;
      case "system":
        icon = "🔧";
        break;
      case "input":
        icon = "🔷";
        break;
      case "output":
        icon = "🟢";
        break;
      case "code":
        icon = "💻";
        break;
      default:
        icon = "💡";
    }

    line.innerHTML = `${icon} ${message}`;
    terminal.appendChild(line);

    // Auto-scroll para o final
    terminal.scrollTop = terminal.scrollHeight;

    // Salva no histórico
    this.terminalOutput += message + "\n";
  }

  clearTerminal() {
    const terminal = document.getElementById("terminalOutput");
    if (terminal) {
      terminal.innerHTML = "";
      this.terminalOutput = "";
      this.logToTerminal("Terminal limpo. Pronto para nova execução.", "info");
    }
  }

  downloadFiles() {
    // Função para download dos arquivos
    Object.keys(this.files).forEach((filename) => {
      const blob = new Blob([this.files[filename]], {
        type: "text/plain",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    this.logToTerminal("📥 Todos os arquivos baixados com sucesso!", "success");
  }
}

// Inicializa a demo quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  window.pythonDemo = new PythonRPCDemo();
});
