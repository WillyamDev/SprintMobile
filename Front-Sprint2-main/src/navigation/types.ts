export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  FeedbackScreen: undefined;
  SintomasScreen: undefined;
  ListaSintomasScreen: undefined;
  RecomendacoesScreen: undefined; // Adicione esta linha
  AdicionarFeedbackScreen: undefined;
};

// Adicione esta exportação para uso global
declare global {
namespace ReactNavigation {
  interface RootParamList extends RootStackParamList {}
}
}  