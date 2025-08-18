import { generateCommandValue } from '@/components/shared/book-item.utils';

describe('generateCommandValue', () => {
  test('Generates command value for book only', () => {
    const result = generateCommandValue('GEN');
    expect(result).toBe('GEN Genesis');
  });

  test('Generates command value for book with chapter', () => {
    const result = generateCommandValue('GEN', undefined, 1);
    expect(result).toBe('GEN Genesis 1');
  });

  test('Generates command value for book with chapter 0', () => {
    const result = generateCommandValue('MAT', undefined, 0);
    expect(result).toBe('MAT Matthew');
  });

  const localizedBookNames = new Map([
    ['GEN', { localizedId: '创', localizedName: '创世记' }],
    ['MAT', { localizedId: '太', localizedName: '马太福音' }],
    ['REV', { localizedId: '启', localizedName: '启示录' }],
  ]);

  test('Generates command value with localizedBookNames for book only', () => {
    const result = generateCommandValue('GEN', localizedBookNames);
    expect(result).toBe('GEN Genesis 创 创世记');
  });

  test('Generates command value with localizedBookNames for book with chapter', () => {
    const result = generateCommandValue('MAT', localizedBookNames, 5);
    expect(result).toBe('MAT Matthew 太 马太福音 5');
  });

  test('Generates command value with localizedBookNames for book with chapter 0', () => {
    const result = generateCommandValue('REV', localizedBookNames, 0);
    expect(result).toBe('REV Revelation 启 启示录');
  });

  test('Falls back to English name and uppercase ID if book not in localizedBookNames', () => {
    const result = generateCommandValue('EXO', localizedBookNames, 2);
    expect(result).toBe('EXO Exodus EXO Exodus 2');
  });

  test('Generates command value for New Testament book', () => {
    const result = generateCommandValue('REV', undefined, 22);
    expect(result).toBe('REV Revelation 22');
  });
});
