"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ObservabilityApp: React.FC = () => {
  // Estado para controlar a exibição do modal de login
  const [showLogin, setShowLogin] = useState<boolean>(false);
  // Estado para o popup de sucesso
  const [open, setOpen] = useState<boolean>(false); 


  // Função para rolar a página suavemente até o formulário de registro
  const scrollToForm = (): void => {
    const element = document.getElementById("register-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full">

      {/* CABEÇALHO */}
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white fixed w-full top-0 z-10">
        <h1 className="text-xl font-bold">Observability App</h1>
        <div className="space-x-4">
          <Button onClick={scrollToForm}>Criar Conta</Button>
          <Button onClick={() => setShowLogin(true)}>Login</Button>
        </div>
      </header>


      <main className="mt-16">
        {/* SECTION 1 */}
        <section className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-3xl font-bold text-center px-8 space-y-6">
          <p>App para estudos de observabilidade com integração de Prometheus e Grafana.</p>
          <div className="flex space-x-24">
            <img src="/prometheus-logo.png" alt="prometheus" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
            <img src="/grafana-logo.png" alt="grafana" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
          </div>
        </section>



        {/* FORMULÁRIO DE CADASTRO */}
        <section id="register-section" className="h-screen flex justify-center items-center bg-gray-200 p-8">
          <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Criar Conta</h2>
              <form 
              className="space-y-4"

              // EVENTOS QUE ACONTECE AO CLICAR EM "CADASTRAR"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(e.currentTarget);
                const values = Object.fromEntries(formData.entries());

                //VERIF. TODOS CAMPOS PREENCHIDOS
                if (Object.values(values).some(value => value === "")) {
                  alert("Todos os campos são obrigatórios!");
                  return;
                }

                //VERIF. SENHA == CONFIRM SENHA
                if (values.senha !== values.confirmarSenha) {
                  alert("As senhas não coincidem!");
                  return;
                }
                console.log("Dados enviados:", values);
                setOpen(true); //MOSTRA O POPUP
                form.reset(); // LIMPA OS CAMPOS DO FORM
              }}
              >
                <Input fullWidth required type="text" name="nome" placeholder="Nome" />
                <Input fullWidth required type="tel" name="telefone" placeholder="Telefone" inputProps={{pattern: "[0-9]*", inputMode: "numeric"}}/>
                <Input fullWidth required type="email" name="email" placeholder="Email" />
                <Input fullWidth required type="password" name="senha" placeholder="Senha" />
                <Input fullWidth required type="password" name="confirmarSenha" placeholder="Confirmar Senha" />
                <Button type="submit" className="w-full">Cadastrar</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* MODAL DE LOGIN */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">Login</h2>
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Senha" className="mt-2" />
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outlined" onClick={() => setShowLogin(false)}>Cancelar</Button>
                <Button>Entrar</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup CADASTRO=TRUE */}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
          Cadastro realizado!
        </Alert>
      </Snackbar>

    </div>
  );
}

export default ObservabilityApp;