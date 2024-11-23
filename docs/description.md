# Explicação

## O que é o Ranking Estadual?

O ranking estadual é um ranking não oficial dos resultados da Associação Mundial de Cubo Mágico (WCA), separado pelos estados do Brasil.

A WCA possui [rankings](https://www.worldcubeassociation.org/results/rankings/333/single) oficiais, mas somente oferece um ranking nacional. Este serviço utiliza os dados mais atuais da WCA para calcular um ranking para cada um dos estados do Brasil. O ranking estadual automaticamente atribui estados aos competitores brasileiros para fornecer um ranking completo.

A atribuição do estado do competitor é feita de forma automática, baseando-se nos estados das competições que o competitor participou, mas também é possível atualizar o próprio estado caso a atribuição esteja incorreta.

Para visualizar um ranking completo do país e de outros países, consulte o [site oficial da WCA](worldcubeassociation.org)

## Como escolher meu estado?

Os estados são atribuídos automaticamente com base nas competições participadas. O estado do competidor é o estado na qual ele mais competiu dentro os outros estados. Essa atribuição automática só acontece quando a maioria das competições do competidor foi no Brasil.

Caso deseja editar o seu estado atribuído, [entre com a sua conta WCA](...) e altere seu estado. O seu estado e seu ranking será atualizado na próxima atualização dos dados, que ocorre pelo menos uma vez por dia. (((NOTA: VOU PENSAR NESSE REQUISITO NAO FUNCIONAL AINDA)))

## Restrições/Requisitos não funcionais

- Só aparecerem competidores brasileiros.
- O método de atribuição de estados só considera competições brasileiras
  - Não consideram competições em múltiplos estados.
- O método considera o estado onde o competidor mais competiu.
