import { getVertexList, type VertexString } from '@/services';

describe('정점의 입력을 검증하는 테스트', () => {
  test('노말한 입력값이 들어왔을 때', () => {
    const textAreaContent = '6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9';
    const restText = textAreaContent.split('\n').splice(1);
    const s = getVertexList(restText);

    const ex: VertexString[] = ['1 2 2', '2 3 8', '3 4 1', '1 4 9', '4 5 7', '5 6 2', '4 6 6', '3 6 9'];
    expect(s).toEqual(ex);
  });

  test('중복 입력값이 들어왔을 때', () => {
    const textAreaContent = '6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n2 1 7\n3 2 912';
    const restText = textAreaContent.split('\n').splice(1);
    const s = getVertexList(restText);

    const ex: VertexString[] = ['1 2 2', '2 3 8', '3 4 1', '1 4 9'];
    expect(s).toEqual(ex);
  });

  test('중복 입력값과 숫자가 아닌 정점의 입력 테스트', () => {
    const textAreaContent = '6\nbb aa 2\ncc dd 8\nee ff 1\naa bb 9\nzz xx 7\ndd cc 912';
    const restText = textAreaContent.split('\n').splice(1);
    const s = getVertexList(restText);

    const ex: VertexString[] = ['aa bb 2', 'cc dd 8', 'ee ff 1', 'xx zz 7'];
    expect(s).toEqual(ex);
  });
});
