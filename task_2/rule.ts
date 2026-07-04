// Единый контракт для всех модулей-правил.
// Каждое правило объявляет своё имя (совпадает с ключом в condition)
// и метод apply, преобразующий список и возвращающий новый список.
export interface Rule {
  name: string;
  apply(
    data: Record<string, unknown>[],
    params: unknown
  ): Record<string, unknown>[];
}
