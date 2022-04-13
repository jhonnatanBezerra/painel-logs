import React from 'react';
import { format } from "date-fns";
import extenso from 'extenso';

export const NovoContrato = (props) => {

  const { data } = props.location.state;
  console.log('dados via props -> ', props.location.state.data);


  const formatMoney = (numberValue) => {

    if (typeof numberValue === 'number') {
      numberValue = numberValue.toString();
    }

    return parseFloat(numberValue)
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  const maskIE = (value) => {
    value = value.toString();
    return value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
  }

  const maskCNPJ = (value) => {
    value = value.toString();
    return value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  const maskCEP = (value) => {
    value = value.toString();
    return value = value.replace(/^(\d{5})(\d{3})/, "$1-$2");
  }

  const maskCPF = (value) => {
    value = value.toString();
    return value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return (
    <div style={{ height: '100%', width: '100vw', display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '0 auto' }}>

      <section style={{ background: '#FFF', height: '841.920000px', }}>
        <p style={{ fontSize: '14pt', fontFamily: 'Times New Roman', fontWeight: '700' }} >CONTRATO DE LOCAÇÃO DE SOFTWARE</p>

        <p style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400' }}>
          Através deste instrumento firmam entre si contrato a empresa  <strong>{data.company_data.company_name}</strong> Inscrição estadual:  <strong>{data.company_data.state_registration.length === 9 ? maskIE(data.company_data.state_registration) : data.company_data.state_registration}</strong> e
          CNPJ: <strong>{maskCNPJ(data.company_data.cnpj)}</strong>, situada à <strong>{data.company_data.adress.type_adress} {data.company_data.adress.street} n° {data.company_data.adress.number} {data.company_data.adress.district} {maskCEP(data.company_data.adress.zip_code)}-{data.company_data.adress.city_name}-{data.company_data.adress.state}</strong>, sob a responsabilidade
          de <strong>{data.owner_data.name}</strong> portador do CPF de Nº <strong>{data.owner_data.cpf && maskCPF(data.owner_data.cpf)}</strong> , doravante denominado <strong>CONTRATANTE</strong>,
          e a empresa <strong>JB Software –</strong> Inscrição Estadual: <strong>28.328.053-0</strong> e CNPJ:  <strong>05.864.986/0001-61</strong>,
          sob a responsabilidade de <strong>Jocsan B. Santos</strong>, CPF <strong>860.006.081-87</strong>,  doravante denominado <strong>CONTRATADO</strong>,
          tendo como objetivo deste contrato a concessão de licença do Software <strong>SISECF Sistema Emissor de Cupom Fiscal/NFe/NFC-e</strong>, doravante denominado <strong>SISTEMA</strong>.
        </p>

        <ul style={{ listStyleType: 'decimal' }}>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong> Propriedade do Sistema:</strong> O SISTEMA, contido no HD(winchester) do usuário é de propriedade do
            CONTRATADO. O CONTRATANTE está licenciado a usar o SISTEMA enquanto durar este contrato.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Número de Licenças:</strong> O CONTRATANTE adquiriu a licença de até
            <strong> {data.contract_data.number_of_computer} ({extenso(data.contract_data.number_of_computer)}) </strong> cópia(s) do SISTEMA, para ser(em) usada(s) na mesma empresa.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Concessão da Licença:</strong> O CONTRATANTE poderá utilizar somente o SISTEMA em um único computador ou
            dentro do limite de estações de trabalho estabelecido pelo <strong>número de licenças</strong> de uso adquiridas, para o caso de
            utilização em Rede. A cada nova licença, será reajustado o valor do aluguel do SISTEMA (mensalidades). Cada
            licença corresponde a uma cópia do SISTEMA instalada no computador, não importando se o mesmo está sendo
            utilizado ou não.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Software de Gestão:</strong> O CONTRATADO autoriza a utilização apenas do sistema de gestão POWERADMIN, na
            qual o mesmo atende as exigências do fisco. Será de responsabilidade do CONTRATANTE a existência de
            qualquer outro aplicativo de gestão instalado na empresa do CONTRATANTE.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Forma de Pagamento:</strong> O SISTEMA foi adquirido sob a forma de locação. O CONTRATANTE compromete-se
            a pagar o aluguel do sistema (mensalidades) todos os meses do ano no valor de <strong>R$ {formatMoney(data.contract_data.value_monthly)} ( {extenso(data.contract_data.value_monthly).toLocaleUpperCase()} REAIS)</strong>.
            O vencimento será todo dia <strong>{data.contract_data.due_day} ({extenso(data.contract_data.due_day).toUpperCase()})</strong> de cada mês.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Reajuste:</strong> O valor da Mensalidade será reajustado todos os meses de Janeiro, com base no acumulado do IGP/M
            (ou o índice que vier a substituí-lo) do ano anterior. No caso do desenvolvimento de novos procedimentos para
            atender exigências da legislação Estadual, Federal ou Municipal poderá ser cobrado o valor do desenvolvimento
            do serviço além de também poder ocasionar o reajuste da mensalidade sem seguir algum índice de inflação,
            sendo o novo valor definido pelo CONTRATADO. A Mensalidade também poderá ser reajustada, caso seja
            aumentado o <strong>número de licenças</strong>.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Suspensão do SISTEMA:</strong> O SISTEMA ficará bloqueado para o uso caso o CONTRATANTE atrase o
            pagamento da mensalidade mais que 15(quinze) dias. O SISTEMA será reativado somente após a quitação de
            todas as prestações em atraso. Mesmo com a suspensão do sistema, o CONTRATANTE ainda deverá quitar as
            parcelas em atraso ao CONTRATADO. Em hipótese alguma, o valor das mensalidades já pagas pelo
            CONTRATANTE serão devolvidos.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Modificações:</strong> Solicitações de alterações em funções ou acrescentar novas funcionalidades ao SISTEMA
            poderão ser sugeridas pelo CONTRATANTE, mas fica a cargo do CONTRATADO a decisão de realizar ou não
            tais sugestões, sendo que essas alterações poderão ser cobradas a parte ou acarretar em aumento do valor da
            mensalidade do sistema.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Manutenção do Sistema:</strong> A manutenção do sistema será efetuada via telefone ou internet . Se o
            CONTRATADO achar necessário ir até o estabelecimento do CONTRATANTE para realizar a manutenção do
            SISTEMA, as despesas de viagens e alimentação ficam por conta do CONTRATANTE, caso a empresa do
            CONTRATANTE não esteja situada em Naviraí. O horário de atendimento é de segunda-feira à sexta-feira, das
            08:00hs às 12:00hs e das 13:00hs às 18:00hs (horário do Estado do Mato Grosso do Sul);
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Responsabilidades:</strong> O CONTRATADO fica responsável por manter o SISTEMA em funcionamento
            (manutenção do SISTEMA), desde que o problema no SISTEMA não seja ocasionado por falhas no
            HARDWARE ou no Sistema Operacional do computador. Fica sob a responsabilidade do CONTRATANTE as
            informações (dados) digitados no SISTEMA. O CONTRATADO não será responsável por quaisquer danos
            diretos e indiretos, lucros cessantes, interrupção de negócios ou perda de informações decorrentes do uso ou da
            impossibilidade de uso do SISTEMA, ainda que o CONTRATADO tenha sido alertado. O treinamento em outros
            softwares que não seja o SISTEMA, não é de responsabilidade do CONTRATADO. No caso de aquisição do
            módulo para geração de arquivos (Sintegra, Sped Fiscal e Sped Pis Cofins) o CONTRATADO não poderá ser
            responsabilizado por falhas ou qualquer outra situação que possa ocorrer na utilização destes arquivos. O
            CONTRATADO não é responsável pela configuração de outros equipamentos tais como: access point, hub,
            servidores, instalação de Certificado Digital , etc. Caso o CONTRATADO realize alguma dessas configurações
            os valores desses serviços será cobrado a parte. No caso de impressora fiscal blindada é de total responsabilidade
            do CONTRATANTE manter a impressora conectada à internet.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Treinamento:</strong> o CONTRATADO compromete-se a dar o treinamento ao CONTRATANTE, sendo que este
            treinamento será cobrado por hora. As dúvidas ou esclarecimentos via telefone ou internet já estão incluídas no
            valor da mensalidade.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Restrições de Responsabilidade Fiscal:</strong> Caso o SISTEMA realize operações que produzam registros de
            qualquer natureza que possam ser utilizados pelo FISCO com fins de fiscalização, fica estatuído que o
            CONTRATADO não poderá ser responsabilizado pela adulteração desses registros através do uso devido ou
            indevido do SISTEMA. O CONTRATADO em nenhuma situação poderá ser responsabilizado pelo não
            cumprimento das obrigações tributárias do CONTRATANTE. É de total responsabilidade do CONTRATANTE
            toda informação registrada no SISTEMA.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Observações Técnicas:</strong> Caso o CONTRATANTE deseje trocar seu computador por outro, deve solicitar antes
            que o CONTRATADO realize os procedimentos necessários para copiar o sistema no novo computador e
            apagá-lo do computador anterior. Caso o CONTRATADO não tenha excluído o sistema do computador que está
            sendo trocado ou vendido, será cobrado o valor de uma nova cópia do sistema, para instalar em outra máquina.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Módulos do SISTEMA:</strong> O sistema possui vários módulos, onde o CONTRATANTE adquiriu a licença de usar
            os assinalados abaixo, sendo que a adição de novos módulos acarretará no reajuste da mensalidade.
            [X] Controle de Caixa, Conta a Receber , Contas Recebidas: [X] Notas fiscais de Entrada
            [X] Contas a Pagar, Contas Pagar, Relatório de compras [X] Controle de despesas [X] Controle Bancário [X]
            Folha de Pagamento [] Boleto Bancário [X] Nota Fiscal Eletrônica NF-e [X] NF Eletrônica Cons.(NFC-e)
            [X] Ordem de Serviço [X]Manifesto
            [] Gerar arquivo no layout Sped Fiscal para ser utilizado pelo esc. de contabilidade
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong> Geração de arquivos:</strong> Geração de arquivos dos lançamentos registrados no sistema para envio ao escritório de
            contabilidade para que o CONTADOR possa fazer a importação, conferência e os ajustes necessários para a
            apuração fiscal. Tipos de arquivos que serão gerados: [ ] Layout Sintegra [ ] Layout Sped Fiscal [ ] Layout
            Sped PisCofins
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Compatibilidade do SISTEMA:</strong> Antes de adquirir novos equipamentos para seu computador o
            CONTRATANTE deve verificar se o equipamento é compatível com o SISTEMA. Rotinas ou programas
            desenvolvidos para funcionar equipamentos não compatíveis com o sistema será cobrado um valor a partir do
            valor negociado. Fica a critério do CONTRATADO a decisão de incluir ou não novos equipamentos no
            SISTEMA.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>NFC-e:</strong> O CONTRATANTE foi instruído e está totalmente ciente que as NFC-e emitidas em contingências
            (OFF-line) tem o prazo de no máximo 24 horas para serem transmitidas, sendo de total responsabilidade do
            CONTRATANTE a conferências das NFC-e que estejam com as transmissões pendentes. No caso de qualquer
            problema com a impressora (instalação, atualização de drive, etc.) que forem realizadas pelo CONTRATADO,
            este serviço não está incluso na mensalidade, sendo cobrado o valor a parte pelo serviço. O CONTRATANTE foi
            orientado a manter backup dos xmls, pelo prazo mínimo de 05 anos, que é exigido pelo fisco.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Segurança dos Dados:</strong> A segurança dos dados será de responsabilidade única do CONTRATANTE, na qual foi
            instruído a tirar cópias de segurança (Backups) diariamente.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Vigência do Contrato:</strong> Este contrato correrá por prazo indeterminado, facultando ao CONTRATANTE ou o
            CONTRATADO, a qualquer tempo, mediante notificação por escrito com 90(noventa) dias de antecedência,
            solicitando o cancelamento deste contrato.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>Cancelamento do Contrato:</strong> Ocorrerá 90(noventa) dias após a notificação por escrito do CONTRATANTE,
            somente se: Todas as mensalidades estiverem quitadas, inclusive as mensalidades vencidas no período dos
            90(noventa) dias após a notificação. Após o Cancelamento do Contrato o CONTRATANTE deve liberar o
            acesso do CONTRATADO as máquinas(computadores) que possuem o SISTEMA instalado para que o mesmo
            seja removido. Será deixado nos computadores do CONTRATANTE apenas o banco de dados e os arquivos
            textos gerados para atender os requisitos PAF-ECF. Em nenhuma hipótese os valores pagos serão devolvidos.
          </li>

          <li style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400', marginLeft: '18pt' }}>
            <strong>FORO:</strong> Fica eleito o foro de Naviraí MS para dirimir quaisquer dúvidas que venham a surgir e não encontrem
            entendimentos entre as partes.
          </li>

        </ul>

        <p style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400' }}>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Fica cancelado qualquer outro contrato referente a CONTRATO DE LOCAÇÃO DE
          SOFTWARE, que porventura possa existir(em) antes desta data.
        </p>

        <p style={{ fontSize: '11.5pt', fontFamily: 'Times New Roman', fontWeight: '400' }}>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;E por estarem justos e acertados, assinam o presente Contrato em duas vias de igual teor e valor para
          que o mesmo faça cumprir seus efeitos legais à partir da presente data.
          Naviraí , 04/03/2022
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '50px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div style={{ borderTop: '1px solid black', paddingBottom: '5px', width: '300px' }} />
            <strong style={{ fontSize: '11.5pt', fontWeight: '700', fontFamily: 'Times New Roman' }}>{data.owner_data.name}</strong>
            <p style={{ fontSize: '11.5pt', fontWeight: '400', fontFamily: 'Times New Roman' }}>CPF: <strong>{data.owner_data.cpf && maskCPF(data.owner_data.cpf)}</strong></p>
            <strong style={{ fontSize: '11.5pt', fontWeight: '700', fontFamily: 'Times New Roman' }}>CONTRATANTE</strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div style={{ borderTop: '1px solid black', paddingBottom: '5px', width: '300px' }} />
            <strong style={{ fontSize: '11.5pt', fontWeight: '700', fontFamily: 'Times New Roman' }}>Jocsan B. Santos</strong>
            <p style={{ fontSize: '11.5pt', fontWeight: '400', fontFamily: 'Times New Roman' }}>CPF: <strong>: 860.006.081-8</strong></p>
            <strong style={{ fontSize: '11.5pt', fontWeight: '700', fontFamily: 'Times New Roman' }}>CONTRATADO</strong>

          </div>
        </div>

      </section>

    </div >

  );
}